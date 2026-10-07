export const photos = {
  granada: { width: 3306, height: 2204, widths: [640, 1280, 1920], version: '' },
  masaya: { width: 4608, height: 3456, widths: [480, 960], version: 'santiago-2026' },
  leon: { width: 1024, height: 684, widths: [480, 960], version: '' },
} as const;
export type PhotoName = keyof typeof photos;
