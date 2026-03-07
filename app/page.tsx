import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans">
      <Image
        src="https://raw.githubusercontent.com/iceccarelli/iceccarelli/main/profile_banner_v3.png"
        alt="Vincenzo Ceccarelli Grimaldi"
        width={1920}
        height={600}
        className="w-full object-cover"
        priority
      />

      <main className="max-w-7xl mx-auto px-6 py-20 lg:px-12">
        <div className="text-center mb-32">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 mb-6">
            Building Intelligent Energy Systems
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto leading-relaxed">
            AI-Driven Digital Twins • Agentic Middleware • Smart Grid Resilience • RWTH Aachen University
          </p>
        </div>

        <section className="max-w-4xl mx-auto mb-32">
          <h2 className="text-4xl font-bold mb-10 border-b border-blue-600 pb-3 inline-block">About Me</h2>
          <p className="text-lg leading-relaxed mb-6">
            At the intersection of electrical power engineering, quantitative intelligence, and knowledge engineering, I design resilient, adaptive cyber-physical systems that power the energy transition.
          </p>
          <p className="text-lg leading-relaxed">
            RWTH Aachen trained (Business Administration & Engineering — Electrical Power Engineering), I bridge theory and production-grade impact through <strong>NeuralBridge</strong>, <strong>GridOS</strong>, and <strong>DERIM</strong>.
          </p>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-12">Core Strengths</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'code', title: 'Programming & Tools', text: 'Python (Pandas, NumPy, PyTorch, JAX), React.js & React Native, SQL/NoSQL, Docker, Kubernetes, CI/CD' },
              { icon: 'brain', title: 'Analytical Methods', text: 'Physics-Informed Neural Networks, Multi-Agent RL, Knowledge Graphs & Ontologies, Time-Series Forecasting, Stochastic Optimization' },
              { icon: 'bolt', title: 'Domain Expertise', text: 'Power Grid Stability & Cybersecurity, DER + V2G Integration, Transactive Energy Markets, IEC 61850 / CIM' },
              { icon: 'leaf', title: 'Strategic Skills', text: 'Life Cycle Assessment, Regulatory Intelligence, Blockchain & Energy DAOs, High-Stakes Project Leadership' }
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900/70 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-5">
                  <i className={`fas fa-${s.icon} text-3xl text-blue-500`} />
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                </div>
                <p className="text-zinc-300">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-12">Flagship Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'NeuralBridge', desc: 'Secure, semantically-aware middleware for agentic AI across any enterprise protocol or legacy system.' },
              { title: 'GridOS', desc: 'Next-gen digital twin fusing physics simulation, RL agents, and real-time optimization for autonomous grids.' },
              { title: 'DERIM', desc: 'Blockchain-native decentralized energy resource platform for P2P trading and virtual power plants.' }
            ].map((p, i) => (
              <div key={i} className="bg-zinc-900/70 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-3xl font-bold text-blue-400 mb-5">{p.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-950 via-zinc-950 to-zinc-950 border border-blue-800/40 rounded-3xl p-16 text-center">
          <h2 className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
            Building AI Infrastructure
          </h2>
          <p className="text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto">
            Strategic consulting & implementation for utilities, operators, and innovators ready to dominate the next energy era.
          </p>
          <a
            href="mailto:vincenzo@grimaldi.engineering?subject=Strategy%20Call%20–%20Intelligent%20Energy%20Systems"
            className="inline-flex items-center gap-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-16 py-8 rounded-2xl font-bold text-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-blue-900/50 hover:shadow-blue-700/70"
          >
            CONTACT ME <i className="fas fa-arrow-right text-xl"></i>
          </a>
        </section>
      </main>
    </div>
  )
}
