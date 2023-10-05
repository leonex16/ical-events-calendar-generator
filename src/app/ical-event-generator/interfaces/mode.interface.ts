export const MODES = ['new', 'edit'] as const;
export type Mode = typeof MODES[number];