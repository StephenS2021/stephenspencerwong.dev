# outputs.tf is Terraforms way of printing useful information to the terminal after `terraform apply` finishes creating the infrastructure
# After Terraform builds everyhting in aws, outputs.tf declares the values that I care about like the site URL and prints them

# This is the URL of the site that will be live at
output "cloudfront_url" {
  value = "https://${aws_cloudfront_distribution.site.domain_name}"
}

# This is the name of the S3 bucket that will be used to store the files for the site
output "s3_bucket_name" {
  value = aws_s3_bucket.site.id
}

# This is the ID of the CloudFront distribution that will be used to serve the site
output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

# This is the ARN of the ACM certificate that will be used to secure the site
# This is used to validate the certificate
# AWS needs me to prove I own the domain, since anyone could request an SSL cert for any domain
# AWS says "add this specific CNAME record to my domain's DNS and only someone who controls the domain can do that" 
# Thme CNAME is a unique name that I add to cloudflare to prove I can control and edit the DNS
# Once AWS can see the valid CNAME, they will validate the certificate
output "acm_certificate_validation_record" {
  description = "Add this CNAME to Cloudflare DNS to validate the certificate"
  value = aws_acm_certificate.site.domain_validation_options
}