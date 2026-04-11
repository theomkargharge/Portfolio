import { MapPin, Briefcase, GraduationCap, Rocket, Smartphone } from 'lucide-react';
import profileImg from './151fd57aafc318b7-f4cfc689-cd5e-4d00-ab26-280280fb6680.png';

const pills = [
  { icon: MapPin, label: 'Pune, Maharashtra' },
  { icon: Smartphone, label: 'iOS & Android' },
  { icon: Rocket, label: '1M+ Downloads' },
  { icon: Briefcase, label: 'Open to Work' },
  { icon: GraduationCap, label: 'B.Tech CSE — 8.47 CGPA' },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <span
            className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-[#00d4ff] border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            About Me
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-2px] leading-[1.1]">
            Building apps that{' '}
            <span className="gradient-text-cyan">millions</span> love
          </h2>
          <p className="text-[17px] text-[#6b7280] mt-4 max-w-lg mx-auto">
            From a curious CS student to a production Flutter developer shipping apps at scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="relative">
              <div
                className="rounded-2xl border border-white/[0.07] p-10 flex items-center justify-center overflow-hidden"
                style={{ background: '#080808', aspectRatio: '1', minHeight: 320 }}
              >
                <img
                  src={profileImg}
                  alt="Omkar Gharge"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div
                className="absolute bottom-0 right-0 translate-x-4 translate-y-4 rounded-xl border border-white/[0.08] p-4 text-center"
                style={{ background: '#0f0f0f', minWidth: 100 }}
              >
                <div className="text-[26px] font-black text-[#00d4ff] leading-none">8.47</div>
                <div className="text-[11px] text-[#6b7280] mt-1 font-medium">CGPA</div>
              </div>

              <div
                className="absolute top-4 left-4 rounded-xl border border-white/[0.08] p-3 flex items-center gap-2"
                style={{ background: '#0f0f0f' }}
              >
                <span className="avail-dot" />
                <span className="text-[12px] text-[#9ca3af]">Available</span>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 order-1 lg:order-2">
            <h3 className="text-[26px] font-bold tracking-tight mb-5">
              Flutter Developer,{' '}
              <span className="text-[#6b7280] font-normal">Pune India</span>
            </h3>
            <div className="space-y-4 text-[15px] text-[#9ca3af] leading-[1.8]">
              <p>
                I specialize in building high-performance, polished mobile applications using Flutter for both iOS and Android.
                With{' '}
                <span className="text-white font-medium">3+ years</span> of professional experience,
                I've contributed to apps with over{' '}
                <span className="text-[#00d4ff] font-semibold">1 million downloads</span>.
              </p>
              <p>
                My expertise spans state management with <span className="text-white">GetX / Riverpod / Provider</span>,
                real-time communication via WebSockets, payment gateway integrations (Razorpay, Tamara, Tabby),
                and seamless third-party service integrations.
              </p>
              <p>
                Currently at{' '}
                <span className="text-white font-semibold">Benzy Infotech</span>,
                maintaining and growing AkbarTravels — one of India's leading travel booking platforms.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-8">
              {pills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-[13px] text-[#9ca3af] border border-white/[0.07] px-3.5 py-2 rounded-lg hover:border-[#00d4ff]/30 hover:text-white transition-all duration-200 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <Icon size={13} className="text-[#00d4ff]" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
