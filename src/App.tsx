const container = 'max-w-3xl mx-auto w-full px-6'
const sectionTitle = 'text-sm font-semibold uppercase tracking-widest text-[#457b9d] mb-6'
const section = 'py-12 border-t border-gray-200'
const accentColor = 'text-[#457b9d]'

type Project = {
  title: string
  description: string
  tags: string[]
  link?: { href: string, label: string }
  image?: string
}

const projects: Project[] = [
  {
    title: 'AI Home Valuation',
    description: 'A home valuation tool for real estate agents. An agent picks an address and adds notes on condition and upgrades. The Express backend pulls an automated valuation and comparable listings from the RentCast API, keeps the five most similar comps, and computes a price-per-square-foot baseline. Claude then uses a strict tool schema to judge whether the automated estimate is reasonable, rank each comp, and suggest a price range.',
    tags: ['React', 'TypeScript', 'Docker', 'Claude API'],
  },
  {
    title: 'Three.js Terrain',
    description: 'A real-time 3D terrain simulation built with Three.js. Constructed mesh geometry from scratch using BufferGeometry, manually computing vertex positions, index arrays, and vertex normals. Implemented a custom fractal Perlin noise function that layers multiple octaves of simplex noise to produce organic, animated terrain that scrolls continuously.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    link: { href: 'https://stephen-threejs-terrain.vercel.app/', label: 'Live demo' },
  },
  {
    title: 'CI/CD Pipeline',
    description: 'Every push to this React and Vite app is linted, tested, and built by GitHub Actions, then deployed to S3 behind CloudFront with the cache invalidated automatically. I provisioned the infrastructure with Terraform, including the S3 bucket, the CloudFront distribution, and the ACM certificate. This website runs on the same pipeline.',
    tags: ['CI/CD', 'GitHub Actions', 'AWS', 'Terraform'],
    link: { href: 'https://github.com/StephenS2021/ci-cd-test', label: 'GitHub' },
  },
]

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      {project.image && (
        <img src={project.image} alt={`Screenshot of ${project.title}`} className="w-full aspect-video object-cover rounded-md border border-gray-200 mb-5" />
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        {project.link && (
          <span className={`text-sm font-medium shrink-0 ${accentColor} group-hover:underline`}>{project.link.label} ↗</span>
        )}
      </div>
      <p className="text-base text-gray-700 leading-relaxed mt-3">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-sm font-medium bg-[#457b9d]/10 text-[#1d3557] rounded px-2.5 py-1">
            {tag}
          </span>
        ))}
      </div>
    </>
  )

  const card = 'block bg-white border border-gray-200 rounded-lg p-6'
  if (!project.link) return <div className={card}>{body}</div>
  return (
    <a href={project.link.href} target="_blank" rel="noreferrer" className={`group ${card} transition-all duration-200 hover:shadow-md hover:border-[#457b9d]`}>
      {body}
    </a>
  )
}

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className={`${container} flex items-center justify-between h-14`}>
          <a href="#home" className="hidden sm:block font-semibold">Stephen Spencer-Wong</a>
          <div className="ml-auto flex text-sm gap-6 text-gray-600">
            <a href="#projects" className="hover:text-gray-900">Projects</a>
            <a href="#experience" className="hover:text-gray-900">Experience</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </nav>

      <div className={`${container} pt-14`}>
        <section className="pt-16 pb-12" id="home">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Stephen Spencer-Wong</h1>
          <p className={`text-lg font-medium mt-2 ${accentColor}`}>Full-Stack Software Engineer</p>
          <p className="text-sm text-gray-500 mt-1">New York University — B.A. Computer Science, 2025</p>
          <p className="text-base text-gray-700 leading-relaxed mt-5 max-w-2xl">I'm a software engineer with a B.A. in Computer Science from NYU. I work across the stack, with React frontends, Node backends, AWS infrastructure, Postgres databases, and Docker. I most recently interned at End of an Era.ai, working on their estate planning app. I'm looking for my next role.</p>
          <div className="flex flex-wrap gap-3 mt-6 text-sm font-medium">
            <a href="/Stephen_Spencer-Wong_Resume_Oct_2026.pdf" target="_blank" className="bg-[#457b9d] hover:bg-[#3a6884] text-white rounded-md px-4 py-2">Resume</a>
            <a href="https://github.com/StephenS2021" target="_blank" rel="noreferrer" className={`border border-gray-300 bg-white hover:border-[#457b9d] rounded-md px-4 py-2 ${accentColor}`}>GitHub</a>
            <a href="https://www.linkedin.com/in/stephen-spencer-wong/" target="_blank" rel="noreferrer" className={`border border-gray-300 bg-white hover:border-[#457b9d] rounded-md px-4 py-2 ${accentColor}`}>LinkedIn</a>
          </div>
        </section>

        <section className={section} id="projects">
          <h2 className={sectionTitle}>Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className={section} id="experience">
          <h2 className={sectionTitle}>Experience</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-xl font-bold">End of an Era.ai — Software Engineer</h3>
            <p className="text-sm text-gray-500">January 2026 – May 2026</p>
          </div>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700 leading-relaxed marker:text-[#457b9d]">
            <li>Built the first iOS release of the app using Capacitor, bridging a React web app to a native mobile build</li>
            <li>Integrated Stripe subscription status checks and gated route protection for paid features</li>
            <li>Implemented role-based account deletion with coordinated backend cleanup across user roles</li>
            <li>Built executor and beneficiary invite flows end-to-end, including session persistence, resend/revoke functionality, and plan-access entry points</li>
          </ul>
        </section>

        <section className={section} id="contact">
          <h2 className={sectionTitle}>Contact</h2>
          <p className="text-gray-700 leading-relaxed">The best way to reach me is by email. I'm happy to talk about open roles or any of the projects above.</p>
          <a href="mailto:sspencerwong28@gmail.com" className={`inline-block text-lg font-medium mt-3 hover:underline ${accentColor}`}>sspencerwong28@gmail.com</a>
        </section>

        <footer className="py-8 border-t border-gray-200 text-sm text-gray-400">
          © {new Date().getFullYear()} Stephen Spencer-Wong
        </footer>
      </div>
    </main>
  )
}

export default App
