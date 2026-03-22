import Image from 'next/image';

export default function Home() {
  return (
    <div className="pt-20">
      {/* HERO BANNER */}
      <Image
        src="https://raw.githubusercontent.com/iceccarelli/iceccarelli/main/profile_banner_v3.png"
        alt="Vincenzo Ceccarelli Grimaldi"
        width={1920}
        height={600}
        className="w-full object-cover"
        priority
      />

      <main className="max-w-7xl mx-auto px-6 py-20 lg:px-12">
        {/* ABOUT */}
        <section id="about" className="max-w-4xl mx-auto mb-32 scroll-mt-24">
          <h2 className="text-4xl font-bold mb-10 border-b border-blue-600 pb-3 inline-block">About Me</h2>
          <p className="text-lg leading-relaxed mb-6">
            At the intersection of electrical power engineering, quantitative intelligence, and knowledge engineering, I design resilient, adaptive cyber-physical systems that power the energy transition.
          </p>
          <p className="text-lg leading-relaxed">
            RWTH Aachen trained (Business Administration & Engineering — Electrical Power Engineering), I bridge theory and production-grade impact through <strong>NeuralBridge</strong>, <strong>GridOS</strong>, and <strong>DERIM</strong>.
          </p>
        </section>

        {/* CORE STRENGTHS */}
        <section id="strengths" className="mb-32 scroll-mt-24">
          <h2 className="text-4xl font-bold mb-12">Core Strengths</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'code', title: 'Programming & Tools', text: 'Python (Pandas, NumPy, PyTorch, JAX), React.js & React Native, SQL/NoSQL, Docker, Kubernetes, CI/CD' },
              { icon: 'brain', title: 'Analytical Methods', text: 'Physics-Informed Neural Networks, Multi-Agent RL, Knowledge Graphs & Ontologies, Time-Series Forecasting, Stochastic Optimization' },
              { icon: 'bolt', title: 'Domain Expertise', text: 'Power Grid Stability & Cybersecurity, DER + V2G Integration, Transactive Energy Markets, IEC 61850 / CIM' },
              { icon: 'leaf', title: 'Strategic Skills', text: 'Life Cycle Assessment, Regulatory Intelligence, Blockchain & Energy DAOs, High-Stakes Project Leadership' }
            ].map((s, i) => (
              <div key={i} className="card-hover bg-zinc-900/70 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 hover:border-blue-500">
                <div className="flex items-center gap-4 mb-5">
                  <i className={`fas fa-${s.icon} text-3xl text-blue-500`} />
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                </div>
                <p className="text-zinc-300">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FLAGSHIP INITIATIVES — GITHUB LINKS */}
        <section id="initiatives" className="mb-32 scroll-mt-24">
          <h2 className="text-4xl font-bold mb-12">Flagship Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'NeuralBridge',
                desc: 'Secure, semantically-aware middleware for agentic AI across any enterprise protocol or legacy system.',
                link: 'https://github.com/iceccarelli/neuralbridge'
              },
              {
                title: 'GridOS',
                desc: 'Next-gen digital twin fusing physics simulation, RL agents, and real-time optimization for autonomous grids.',
                link: 'https://github.com/iceccarelli/GridOS'
              },
              {
                title: 'DERIM',
                desc: 'Blockchain-native decentralized energy resource platform for P2P trading and virtual power plants.',
                link: 'https://github.com/iceccarelli/derim-middleware'
              }
            ].map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover block bg-zinc-900/70 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 hover:border-blue-500 group"
              >
                <h3 className="text-3xl font-bold text-blue-400 mb-5 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{p.desc}</p>
                <div className="mt-6 text-cyan-400 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  View on GitHub <i className="fas fa-arrow-right text-xs"></i>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* PHD RESOURCES (EMAIL BUTTON KEPT — it is NOT "Start a Conversation") */}
        <section id="phd" className="mb-32 scroll-mt-24 bg-zinc-900/50 rounded-3xl p-16 border border-zinc-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">PhD Application Materials</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Upload supporting documents for my PhD applications or download existing materials</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Upload Area */}
            <div
              id="upload-zone"
              className="upload-zone border-2 border-dashed border-zinc-700 rounded-3xl p-12 text-center hover:border-cyan-400 transition-colors group"
              onDragOver={(e) => { e.preventDefault(); document.getElementById('upload-zone')?.classList.add('dragover'); }}
              onDragLeave={() => document.getElementById('upload-zone')?.classList.remove('dragover')}
              onDrop={(e) => { e.preventDefault(); document.getElementById('upload-zone')?.classList.remove('dragover'); alert('File received! You can now email it below.'); }}
            >
              <i className="fas fa-cloud-upload-alt text-6xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform"></i>
              <p className="text-lg mb-2">Drop PDF files here or</p>
              <label className="inline-block bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold px-8 py-4 rounded-2xl cursor-pointer transition-all active:scale-95">
                BROWSE FILES
                <input type="file" multiple accept=".pdf" className="hidden" onChange={(e) => {
                  if (e.target.files?.length) alert(`${e.target.files.length} file(s) selected. Use the button below to send them.`);
                }} />
              </label>
            </div>
            {/* Downloadable Materials */}
            <div className="space-y-6">
              <a href="#" className="block p-8 bg-zinc-900 rounded-3xl border border-zinc-700 hover:border-cyan-400 transition-all flex items-center justify-between group">
                <div>
                  <div className="font-semibold">Curriculum Vitae</div>
                  <div className="text-sm text-zinc-500">Updated March 2026 • 4 pages</div>
                </div>
                <i className="fas fa-download text-2xl text-cyan-400 group-hover:-translate-y-1 transition-transform"></i>
              </a>
              <a href="#" className="block p-8 bg-zinc-900 rounded-3xl border border-zinc-700 hover:border-cyan-400 transition-all flex items-center justify-between group">
                <div>
                  <div className="font-semibold">Research Statement</div>
                  <div className="text-sm text-zinc-500">AI for Grid Autonomy • 6 pages</div>
                </div>
                <i className="fas fa-download text-2xl text-cyan-400 group-hover:-translate-y-1 transition-transform"></i>
              </a>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => window.location.href = "mailto:vincenzo@grimaldi.engineering?subject=PhD%20Application%20Documents"}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-semibold text-xl shadow-xl shadow-cyan-500/30 hover:shadow-2xl active:scale-95 transition-all duration-300"
            >
              EMAIL SELECTED FILES NOW
            </button>
          </div>
        </section>

        {/* INSPIRATION SECTION */}
        <section id="inspiration" className="bg-gradient-to-br from-blue-950 via-zinc-950 to-zinc-950 border border-blue-800/40 rounded-3xl p-16 text-center scroll-mt-24">
          <h2 className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
            Building AI-Native Energy Infrastructure
          </h2>
          <p className="text-2xl text-zinc-300 mb-10 max-w-3xl mx-auto">
            Strategic consulting & implementation for utilities, operators, and innovators ready to dominate the next energy era.
          </p>
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-[3px] text-blue-400 text-sm mb-6">Sources of Inspiration & Intelligence</p>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="https://about.bnef.com/" target="_blank" rel="noopener noreferrer" className="card-hover group bg-zinc-900/80 p-8 rounded-3xl border border-zinc-700 hover:border-blue-500">
                <h4 className="font-bold text-2xl mb-3 text-white">BloombergNEF</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">The world’s leading source for energy market intelligence, AI load forecasts, and infrastructure investment trends.</p>
                <span className="text-cyan-400 text-sm group-hover:underline">bnef.com →</span>
              </a>
              <a href="https://www.iea.org/" target="_blank" rel="noopener noreferrer" className="card-hover group bg-zinc-900/80 p-8 rounded-3xl border border-zinc-700 hover:border-blue-500">
                <h4 className="font-bold text-2xl mb-3 text-white">International Energy Agency</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">Authoritative global analysis on AI for energy optimisation, grid modernization, and the clean energy transition.</p>
                <span className="text-cyan-400 text-sm group-hover:underline">iea.org →</span>
              </a>
              <a href="https://energy.mit.edu/" target="_blank" rel="noopener noreferrer" className="card-hover group bg-zinc-900/80 p-8 rounded-3xl border border-zinc-700 hover:border-blue-500">
                <h4 className="font-bold text-2xl mb-3 text-white">MIT Energy Initiative</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">Pioneering research in digital twins, physics-informed AI, and autonomous energy systems — core to GridOS thinking.</p>
                <span className="text-cyan-400 text-sm group-hover:underline">energy.mit.edu →</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
