import { Car, Plane, Radar, Sparkles, type LucideIcon } from 'lucide-react';
import type { Project } from '../data';
import { clamp, easeInOut } from '../hooks';

/* How each project looks as an app on the showcase phone */
export const APP_LOOK: Record<Project['id'], { label: string; accent: string; rgb: [number, number, number]; icon: string; Glyph: LucideIcon }> = {
  akbar: { label: 'Akbar', accent: '#7fb0ff', rgb: [127, 176, 255], icon: 'linear-gradient(150deg,#6aa8ff,#2f62e0)', Glyph: Plane },
  tryware: { label: 'TryWare', accent: '#c4b5fd', rgb: [196, 181, 253], icon: 'linear-gradient(150deg,#c084fc,#f472b6)', Glyph: Sparkles },
  buggy: { label: 'Buggy', accent: '#6ee7b7', rgb: [110, 231, 183], icon: 'linear-gradient(150deg,#34d399,#0ea5e9)', Glyph: Car },
  appinspect: { label: 'AppInspect', accent: '#67e8f9', rgb: [103, 232, 249], icon: 'linear-gradient(150deg,#22d3ee,#0e7490)', Glyph: Radar },
};

const HOME_RGB: [number, number, number] = [139, 123, 255];

/* Home-screen grid, as fractions of the screen box — shared by the layout and the launch animation */
export const ICON = 0.17; // icon tile, fraction of screen width
export const ICON_Y = 0.318; // centre of the app row, fraction of screen height
export const COLS = [0.135, 0.378, 0.622, 0.865];

/* Glow colour for a phone state: home → violet, between apps → a blend of their accents */
export function accentAt(rgbs: [number, number, number][], h: number, p: number) {
  const k = Math.min(Math.floor(p), rgbs.length - 1);
  const v = easeInOut(clamp(p - k, 0, 1));
  const a = rgbs[k];
  const b = rgbs[Math.min(k + 1, rgbs.length - 1)];
  return [0, 1, 2].map((i) => Math.round((a[i] + (b[i] - a[i]) * v) * (1 - h) + HOME_RGB[i] * h)).join(' ');
}

/*
 * Phone state.
 * q is one number for the whole journey: -1 = home screen, 0 = first app open, 1 = second app…
 * Between -1 and 0 the first app zooms out of its icon; between whole numbers apps slide past
 * each other like the iOS app switcher. Tapping an icon or the home bar plays a "direct" launch
 * or close for any app, which q alone can't describe, so that runs as its own little spring.
 */
export class PhoneMotion {
  q = -1;
  vq = 0;
  target = -1;
  dragging = false;
  direct: { p: number; h: number; v: number; to: 0 | 1 } | null = null;
  private queued: number | null = null;
  private readonly count: number;

  constructor(count: number) {
    this.count = count;
  }

  /** h: 1 = home screen, 0 = inside an app · p: which app (fractional while switching) */
  get state() {
    if (this.direct) return { h: this.direct.h, p: this.direct.p };
    return { h: Math.max(0, -this.q), p: Math.max(0, this.q) };
  }

  /** In q-units per second — the phone leans with it */
  get velocity() {
    return this.direct ? -this.direct.v * 0.6 : this.vq;
  }

  goTo(q: number) {
    const t = clamp(Math.round(q), -1, this.count - 1);
    if (this.direct) this.queued = t;
    else this.target = t;
  }

  launch(i: number) {
    if (!this.direct && !this.dragging && this.q === -1 && this.target === -1) {
      this.direct = { p: i, h: 1, v: 0, to: 0 };
      this.target = i;
    } else this.goTo(i);
  }

  goHome() {
    if (!this.direct && !this.dragging && this.q >= 0 && this.q === this.target) {
      this.direct = { p: this.q, h: 0, v: 0, to: 1 };
      this.target = -1;
    } else this.goTo(-1);
  }

  dragStart() {
    if (this.direct) this.finishDirect();
    this.dragging = true;
    this.vq = 0;
  }

  dragTo(q: number, velocity: number) {
    this.q = clamp(q, -1, this.count - 1);
    this.vq = velocity;
  }

  /** Let go: settle on the nearest app, nudged by how fast it was flicked */
  dragEnd() {
    this.dragging = false;
    const flick = clamp(this.vq * 0.22, -0.6, 0.6);
    this.target = clamp(Math.round(this.q + flick), -1, this.count - 1);
    return this.target;
  }

  /** Advance the springs; returns false once everything is at rest */
  step(dt: number, stiffness = 170) {
    if (this.dragging) return true;
    const damping = 2 * Math.sqrt(stiffness); // critically damped — no overshoot
    let moving = false;
    for (let left = dt; left > 0; left -= 1 / 120) {
      const h = Math.min(left, 1 / 120);
      const d = this.direct;
      if (d) {
        d.v += (-stiffness * (d.h - d.to) - damping * d.v) * h;
        d.h = clamp(d.h + d.v * h, 0, 1);
        if (Math.abs(d.h - d.to) < 0.0008 && Math.abs(d.v) < 0.02) this.finishDirect();
        moving = true;
        continue;
      }
      const dx = this.q - this.target;
      if (Math.abs(dx) < 0.0006 && Math.abs(this.vq) < 0.006) {
        this.q = this.target;
        this.vq = 0;
        break;
      }
      this.vq += (-stiffness * dx - damping * this.vq) * h;
      this.q = clamp(this.q + this.vq * h, -1, this.count - 1);
      moving = true;
    }
    return moving;
  }

  private finishDirect() {
    const d = this.direct;
    if (!d) return;
    this.q = d.to === 0 ? d.p : -1;
    this.vq = 0;
    this.direct = null;
    this.target = this.queued ?? this.q;
    this.queued = null;
  }
}
