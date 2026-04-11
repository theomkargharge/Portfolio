const items = [
  'Flutter', 'Dart', 'Firebase', 'Supabase', 'GetX', 'Riverpod', 'Provider',
  'WebSocket', 'RESTful API', 'Razorpay', 'Google Maps', 'CleverTap',
  'AWS S3', 'Git & GitHub', 'AdMob', 'iOS & Android', 'Deep Linking',
  'Push Notifications', 'CI/CD', 'App Store Connect', 'Google Play Console',
];

const doubled = [...items, ...items];

export default function TechTicker() {
  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.06] py-4"
      style={{ background: '#080808' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <span
              className="text-[12px] font-medium text-[#6b7280] whitespace-nowrap px-4 py-2 rounded-lg border border-white/[0.06]"
              style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.02)' }}
            >
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#1f1f1f] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
