import type { ReactNode } from 'react';

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
};

// Everything sits on the left: the right-hand side above each section is the journey phone's flight lane
export default function SectionHeading({ index, label, title, aside }: Props) {
  return (
    <div className="mb-12 max-w-3xl sm:mb-16">
      <div className="reveal eyebrow flex items-center gap-3">
        <span className="text-fg-2">{index}</span>
        <span className="h-px w-8 bg-white/15" />
        {label}
      </div>
      <h2 className="reveal display mt-5 text-balance text-[clamp(36px,5.2vw,64px)] text-fg" style={{ ['--d' as string]: '80ms' }}>
        {title}
      </h2>
      {aside && (
        <div className="reveal mt-6 max-w-xl text-[15.5px] leading-relaxed text-fg-2" style={{ ['--d' as string]: '160ms' }}>
          {aside}
        </div>
      )}
    </div>
  );
}
