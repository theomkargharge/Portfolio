import type { DOMAttributes } from 'react';

// One phone travels the whole page (see JourneyPhone). Sections mark where it should stop with a
// <Station>; these are the stops, in page order.
export type StationId = 'hero' | 'work' | 'career' | 'galaxy' | 'about' | 'contact';

export type PhoneHandlers = Pick<
  DOMAttributes<HTMLDivElement>,
  'onPointerDown' | 'onPointerMove' | 'onPointerUp' | 'onPointerCancel' | 'onClickCapture' | 'onDragStart' | 'onKeyDown'
>;

// The Work section drives what the phone's OS shows while it's docked there. Whichever showcase is
// mounted (scroll on desktop, swipe on touch) publishes its state here every frame, and the
// journey phone sends taps and drags back through the same object.
export const workLink = {
  h: 1,
  p: 0,
  vel: 0,
  launch: (() => {}) as (i: number) => void,
  home: () => {},
  handlers: null as PhoneHandlers | null,
};
