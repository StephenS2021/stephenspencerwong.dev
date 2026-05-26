const bordersOn = 'border-0 border-gray-300'
const projectCard = 'transition-all duration-200 hover:shadow-lg cursor-pointer bg-white border border-gray-200 rounded-lg'
const sectionTitle = 'text-sm font-semibold uppercase tracking-widest text-gray-400'
const accentColor = 'text-[#457b9d]'

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <nav className={`fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200`}>
        <div className="max-w-2xl mx-auto w-full flex items-center px-4 h-14 ">
          <div className="flex text-sm gap-6">
            <a href="/">Home</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>      
      <div className='max-w-2xl mx-auto w-full flex flex-col gap-16 pt-14'>
        <div className={`text-center py-12 ${bordersOn}`} id="home">
          <h1 className={`text-4xl md:text-6xl font-bold`}>Stephen Spencer Wong</h1>
          <p className={`text-lg font-medium mt-2 ${accentColor}`}>Full-Stack Software Engineer</p>
          <p className="text-base font-normal mt-4">I'm a software engineer with a Bachelor of Arts in Computer Science from New York University. My work
                  spans the full stack, from React frontends to backend services, cloud infrastructure, and everything in between. I'm currently working at End of an Era.ai and looking for what's next.</p>
          <div className="flex flex-row gap-4 justify-center mt-4">
            <a href="https://github.com/Stephens2021" className={`${accentColor} justify-center underline`}>GitHub</a>
            <a href="https://www.linkedin.com/in/stephen-spencer-wong/" className={`${accentColor} justify-center underline`}>LinkedIn</a>
            <a href="/Stephen_Spencer-Wong_Resume_April2026.pdf" target="_blank" className={`${accentColor} justify-center underline`}>Resume</a>
          </div>
          
        </div>

        <div className={`text-center flex flex-col justify-center gap-4 py-12 ${bordersOn}`} id="projects">
          <h1 className={sectionTitle}>Projects</h1>
          <div className="flex flex-row gap-4 justify-center">
            <div onClick={() => window.open('https://stephen-threejs-terrain.vercel.app/', '_blank')} className={`text-center p-4 border-2 ${projectCard}`}>
              <h2 className="text-xl font-bold">Three.js Terrain</h2>
              <p className="text-base font-normal">
                A real-time 3D terrain simulation built with Three.js. Constructed mesh geometry from scratch using BufferGeometry, manually computing vertex positions, index arrays, and vertex normals. Implemented a custom fractal Perlin noise function that layers multiple octaves of simplex noise to produce organic, animated terrain. The terrain scrolls continuously by offsetting the noise sample each frame.
              </p>
              <div className="flex flex-row justify-center gap-4 mt-4">
                {['React', 'TypeScript', 'Tailwind CSS', 'Three.js'].map((item) => (
                  <span className="text-sm font-medium border-l-2 border-[#457b9d] bg-gray-100 text-gray-600 px-3 py-1">
                  {item}
                </span>
                ))}
              </div>
            </div>

            <div onClick={() => window.open('https://github.com/StephenS2021/ci-cd-test', '_blank')} className={`text-center p-4 border-2 ${projectCard}`}>
              <h2 className="text-xl font-bold">CI/CD Pipeline</h2>
              <p className="text-base font-normal">
                Built a full CI/CD pipeline for a React + Vite application. 
                Provisioned AWS infrastructure (S3 bucket, CloudFront distribution, ACM certificate) using Terraform, 
                configured GitHub Actions workflows for linting, testing, and building on every push, 
                and set up automated deployment to S3 with CloudFront cache invalidation. 
                I used the same skills to build the CI/CD pipeline for this website.
              </p>
              <div className="flex flex-row justify-center gap-4 mt-4">
                {['CI/CD', 'GitHub Actions', 'AWS', 'Terraform'].map((item) => (
                  <span className="text-sm font-medium border-l-2 border-[#457b9d] bg-gray-100 text-gray-600 px-3 py-1">
                  {item}
                </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`text-center py-12 ${bordersOn}`} id="experience">
          <h1 className={`${sectionTitle} mb-4`} >Experience</h1>
          <div className="flex flex-col items-start gap-4 pl-8 text-left">
            <h2 className="text-xl font-bold">End of an Era.ai — Software Engineer</h2>
            <h3 className="text-lg font-bold">January 2026 - Present</h3>
              <ul className="list-disc list-inside">
                <li>Built the first iOS release of the app using Capacitor, bridging a React web app to a native mobile build</li>
                <li>Integrated Stripe subscription status checks and gated route protection for paid features</li>
                <li>Implemented role-based account deletion with coordinated backend cleanup across user roles</li>
                <li>Built executor and beneficiary invite flows end-to-end, including session persistence, resend/revoke functionality, and plan-access entry points</li>
              </ul>
          </div>
        </div>
        <div className={`text-center py-12 ${bordersOn}`}>
          <h1 className={`${sectionTitle} mb-4`}>Education</h1>
          New York University — B.A. Computer Science, 2025
        </div>

        <div className={`text-center py-12 ${bordersOn}`} id="contact">
          <h1 className={`${sectionTitle} mb-4`}>Contact Information</h1>
          <div className="flex flex-col gap-4 items-center" >
            <p className={`text-base font-normal ${accentColor}`}>sspencerwong28@gmail.com</p>
            <a href="https://github.com/StephenS2021" className={`${accentColor}`}>GitHub</a>
            <a href="https://www.linkedin.com/in/stephen-spencer-wong/" className={`${accentColor}`}>LinkedIn</a>
          </div>
        </div>
        
      </div>
    </main>
  )
}

export default App
