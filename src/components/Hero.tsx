import { ArrowRight, Download } from 'lucide-react';

const codeLines = [
  { tokens: [{ t: '// AkbarTravels · 1M+ downloads', c: 'comment' }] },
  { tokens: [] },
  { tokens: [{ t: 'class ', c: 'keyword' }, { t: 'FlightBooking ', c: 'type' }, { t: 'extends ', c: 'keyword' }, { t: 'StatefulWidget ', c: 'type' }, { t: '{', c: 'punct' }] },
  { tokens: [{ t: '  final ', c: 'keyword' }, { t: 'String ', c: 'type' }, { t: 'origin', c: 'var' }, { t: ', ', c: 'punct' }, { t: 'destination', c: 'var' }, { t: ';', c: 'punct' }] },
  { tokens: [{ t: '  final ', c: 'keyword' }, { t: 'DateTime ', c: 'type' }, { t: 'departureDate', c: 'var' }, { t: ';', c: 'punct' }] },
  { tokens: [] },
  { tokens: [{ t: '  @', c: 'keyword' }, { t: 'override', c: 'fn' }] },
  { tokens: [{ t: '  ', c: 'var' }, { t: 'Widget ', c: 'type' }, { t: 'build', c: 'fn' }, { t: '(', c: 'punct' }, { t: 'BuildContext ', c: 'type' }, { t: 'ctx', c: 'var' }, { t: ') {', c: 'punct' }] },
  { tokens: [{ t: '    return ', c: 'keyword' }, { t: 'StreamBuilder', c: 'type' }, { t: '<', c: 'punct' }, { t: 'List', c: 'type' }, { t: '<', c: 'punct' }, { t: 'Flight', c: 'type' }, { t: '>>(', c: 'punct' }] },
  { tokens: [{ t: '      stream', c: 'var' }, { t: ': ', c: 'punct' }, { t: 'flightService', c: 'fn' }, { t: '.', c: 'punct' }, { t: 'search', c: 'fn' }, { t: '(', c: 'punct' }] },
  { tokens: [{ t: '        origin', c: 'var' }, { t: ': ', c: 'punct' }, { t: 'origin', c: 'string' }, { t: ',', c: 'punct' }] },
  { tokens: [{ t: '        departure', c: 'var' }, { t: ': ', c: 'punct' }, { t: 'departureDate', c: 'var' }, { t: ',', c: 'punct' }] },
  { tokens: [{ t: '      ),', c: 'punct' }] },
  { tokens: [{ t: '    );', c: 'punct' }] },
  { tokens: [{ t: '  }', c: 'punct' }] },
  { tokens: [{ t: '}', c: 'punct' }] },
];

const colorMap: Record<string, string> = {
  keyword: '#00d4ff',
  type: '#7dd3fc',
  string: '#86efac',
  comment: '#4b5563',
  fn: '#fbbf24',
  var: '#e2e8f0',
  punct: '#6b7280',
  num: '#fb923c',
};

const stats = [
  { num: '3+', label: 'Years Experience' },
  { num: '1M+', label: 'App Downloads' },
  { num: '3+', label: 'Apps Shipped' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '80px' }}>
      <div className="absolute inset-0 grid-pattern opacity-100" />

      <div className="orb orb-cyan" style={{ width: 700, height: 700, top: -200, left: -200, animationDelay: '0s' }} />
      <div className="orb orb-amber" style={{ width: 500, height: 500, top: 200, right: -200, animationDelay: '-4s' }} />
      <div className="orb orb-white" style={{ width: 400, height: 400, bottom: 0, left: '40%', animationDelay: '-7s' }} />

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="flex-1 max-w-xl">
          <div className="animate-fade-up inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 mb-8">
            <span className="avail-dot" />
            <span className="text-[13px] text-[#9ca3af] font-medium">Available for opportunities</span>
          </div>

          <h1 className="animate-fade-up delay-100 text-[clamp(44px,6vw,76px)] font-black leading-[1.05] tracking-[-3px] mb-6">
            Flutter
            <br />
            <span className="gradient-text">Developer.</span>
          </h1>

          <p className="animate-fade-up delay-200 text-[17px] text-[#6b7280] leading-[1.75] mb-8 max-w-lg">
            Hi, I'm{' '}
            <span className="text-white font-semibold">Omkar Gharge</span> — building high-performance mobile apps for iOS &amp; Android.
            Currently at{' '}
            <span style={{ color: '#00d4ff' }} className="font-medium">Benzy Infotech</span>{' '}
            shipping{' '}
            <span className="text-white font-semibold">AkbarTravels</span> with 1M+ downloads.
          </p>

          <div className="animate-fade-up delay-300 flex flex-wrap gap-3 mb-12">
            <a
              href="#projects"
              className="btn-shimmer inline-flex items-center gap-2 bg-[#00d4ff] text-black font-semibold text-[14px] px-6 py-3 rounded-xl hover:bg-white transition-colors duration-200"
            >
              View My Work <ArrowRight size={15} />
            </a>
            <a
              href="https://drive.google.com/file/d/1Rs0toXfCOPTlfj7dkEz-V6XMY_7tH8ag/view?usp=sharing"
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] text-white font-semibold text-[14px] px-6 py-3 rounded-xl hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-200"
            >
              Get In Touch <Download size={15} />
            </a>
          </div>
          
          <div className="animate-fade-up delay-400 flex gap-10 pt-8 border-t border-white/[0.06]">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-[32px] font-black text-white stat-glow leading-none tracking-tight mb-1">
                  <span style={{ color: '#00d4ff' }}>{s.num.replace(/[^0-9M]/g, '')}</span>
                  {s.num.includes('+') ? <span className="text-white">+</span> : null}
                </div>
                <div className="text-[12px] text-[#6b7280] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block flex-shrink-0 animate-scale-in delay-400">
          <div
            className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{
              background: '#0a0a0a',
              width: 440,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.04)',
            }}
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]" style={{ background: '#0c0c0c' }}>
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span
                className="ml-3 text-[12px] text-[#4b5563] flex-1 text-center"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                flight_booking.dart
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded border border-[#00d4ff]/20 text-[#00d4ff]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Flutter
              </span>
            </div>

            <div className="p-5 overflow-hidden" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: '1.75' }}>
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-6 text-right text-[#2d2d2d] mr-5 select-none text-[11px]">{i + 1}</span>
                  <span>
                    {line.tokens.length === 0 ? '\u00A0' : line.tokens.map((tok, j) => (
                      <span key={j} style={{ color: colorMap[tok.c] || '#e2e8f0' }}>{tok.t}</span>
                    ))}
                    {i === codeLines.length - 1 && (
                      <span className="cursor-blink inline-block w-[2px] h-[13px] bg-[#00d4ff] ml-0.5 align-middle" />
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06]" style={{ background: '#0c0c0c' }}>
              <div className="flex gap-3">
                {['Flutter', 'GetX', 'WebSocket'].map((tag) => (
                  <span key={tag} className="text-[11px] text-[#6b7280]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="text-[11px] text-[#6b7280]">No issues</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3 justify-end">
            {['Dart', 'Firebase', 'Riverpod', 'iOS + Android'].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1 rounded-full border border-white/[0.06] text-[#6b7280]"
                style={{ background: 'rgba(255,255,255,0.02)', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
