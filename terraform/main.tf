# This is the Terraform configuration file for the project.
# It is used to configure the Terraform provider and the Terraform backend.

# This is the Terraform configuration block.
# It is used to configure the Terraform provider and the Terraform backend.
terraform {
    required_version = ">= 1.0.0"
    required_providers {
        aws = { 
            source = "hashicorp/aws" 
            version = "~> 5.0" 
        }
    }
}

# This is the provider config for the aws provider
# It uses the aws object that we defined in the required_providers block
provider "aws" {
    region = "us-east-1"
}

# Create a resource of type aws_s3_bucket
# This resource will create an S3 bucket in the AWS account
# The bucket name is "stephen-2026-ci-cd-test"
# "site" is the name of the resource which is used to reference the bucket in the other resources as resource_type.local_name.attribute so -> aws_s3_bucket.site.[some attribute]
# All the resources belong to the same site so I use "site" as the local_name for all the resources
# If we had multiple resources of the same type, I'd need to use different local_names like two s3 buckets "site" and "logs"
resource "aws_s3_bucket" "site" {
    bucket = "stephen-2026-ci-cd-test"
}

# Create a resource to block public access to the bucket
# We want users to access the bucket via the CloudFront distribution, not directly through the bucket
resource "aws_s3_bucket_public_access_block" "site" {
    # Reference the s3 bucket using the id from the resource we created earlier
    bucket = aws_s3_bucket.site.id

    block_public_acls = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
}


resource "aws_cloudfront_origin_access_control" "site" {
    name = "deploy-bucket-oac" # Label for the origin access control
    origin_access_control_origin_type = "s3" # Origin type is s3 because that is what cloudfront is accessing
    signing_behavior = "always" # Every request CloudFront makes to S3 will be signed with credentials
    signing_protocol = "sigv4" # AWS standard signing format
    
}

# Create a resource to create a cloudfront distribution
resource "aws_cloudfront_distribution" "site" {
    enabled = true # Turn on the distribution
    default_root_object = "index.html" # When someone visits root URL(/), serve index.html
    price_class = "PriceClass_100" # Cheapest price class for controlling which edge locaitons are used

    aliases = ["stephenspencerwong.dev", "www.stephenspencerwong.dev"] # The custom domain names to use for the distribution


    # Create an origin for the distribution
    # An origin is where CloudFront will go to get the files
    # It is the source of the files that are being served
    # In this case, the origin is the S3 bucket
    origin {
        domain_name = aws_s3_bucket.site.bucket_regional_domain_name # The S3 bucket URL will be the origin for the distribution
        origin_id = "s3-deploy-bucket" # Label to identify this origin
        origin_access_control_id = aws_cloudfront_origin_access_control.site.id # attaches the Origin Access Control written in the above resource, giving CloudFront its signed identity
    }

    # This block tells CloudFront how to handle requests and what to cache
    default_cache_behavior {
        target_origin_id = "s3-deploy-bucket" # The origin ID for the origin we created earlier
        viewer_protocol_policy = "redirect-to-https" # Anyone visiting over HTTP gets redirected to HTTPS automatically
        allowed_methods = ["GET", "HEAD"] # Only allow GET and HEAD requests since this is only a static site at the moment
        cached_methods = ["GET", "HEAD"] # Only cache GET and HEAD requests 
        compress = true # Compress files automatically for faster download

        forwarded_values {
            query_string = false # Tells CF not to pass query strings or cookies to S3 (S3 doesn't need them for static files)
            cookies {
                forward = "none" # Tells CF not to pass cookies to S3 (S3 doesn't need them for static files)
            }
        }

        min_ttl     = 0 # How long files are cached in seconds
        default_ttl = 3600
        max_ttl     = 86400
    }

    # In the case of a 403 or 404 error, serve the index.html file
    # This is because React is a single-page app. 
    # The browser loads index.html once 
    #   and then any time the user navigates to another link, React intercepts it and just swaps the content in the DOM without reloading a new page
    # If we didn't have these error responses, the browser would look for an html file by the requested name (like /about), which wouldn't exist
    custom_error_response {
        error_code = 403
        response_code = 200
        response_page_path = "/index.html"
    }
    custom_error_response {
        error_code = 404
        response_code = 200
        response_page_path = "/index.html"
    }

    # Restrictions can be used to restrict access to the site by country
    restrictions {
        geo_restriction {
            restriction_type = "none" # Allow all countries to access the site
        }
    }

    # We don't want to use the CF default certificate provided by AWS, because I am now using a custom domain
    # Instead, we will use the ACM certificate I created below
    viewer_certificate {
        acm_certificate_arn = aws_acm_certificate_validation.site.certificate_arn # Use the now validated ACM certificate
        ssl_support_method = "sni-only" # SNI (Server Name Indication) allows multiple secure domains to share a single IP address and the server relies on the client's browser to specify a domain name to connect to
        minimum_protocol_version = "TLSv1.2_2021" # This is the minimum protocol version that is supported by the certificate
        
    }
}

# Create a policy to allow CloudFront to read the bucket
# This is necessary because CloudFront needs to be able to read the files in the bucket to serve them to the user
# Without this policy, CloudFront would not be able to read the files in the bucket and would return a 403 error
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id # Attaches this policy to the bucket

  policy = jsonencode({
    Version = "2012-10-17" # The version of the policy language
    Statement = [
      {
        Sid    = "AllowCloudFrontRead" 
        Effect = "Allow" # Grants the permission to the principal
        Principal = { # Grants access to specifically cloudfront.amazonaws.com
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject" # Allows readign files and nothing else (no uploading, deleting, etc.)
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = { # only allows CloudFront distributions that match the specific distribution's ARN that was created earlier. Without this, any CF distribution in any AWS account could read the bucket
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
          }
        }
      }
    ]
  })
}

# Request a new certificate from the AWC certificate manager (ACM)
# This is necessary for a custom domain
# Wihtout it, the site would not be secure (https)
resource "aws_acm_certificate" "site" {
    domain_name = "stephenspencerwong.dev" # The domain name to request the certificate for
    validation_method = "DNS" # Use DNS validation to verify ownership of the domain
    subject_alternative_names = ["www.stephenspencerwong.dev"] # Also request a certificate for the www subdomain

    # The lifecycle block customizes how Terraform handles this resource
    # In this case, we want to create a new cert before destroying the old one
    # This is because the new cert will be validated by AWS, then the old one can be destroyed
    # This prevents downtime when the certificate is being validated
    lifecycle {
        create_before_destroy = true
    }
}

# Validate the certificate
resource "aws_acm_certificate_validation" "site" {
    certificate_arn = aws_acm_certificate.site.arn
}