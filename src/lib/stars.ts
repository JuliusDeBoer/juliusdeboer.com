// Neatly stolen from: <https://stackoverflow.com/q/521295>
function mulberry32(seed: number) {
  return function () {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface StarFieldOptions {
  width?: number;
  height?: number;
  count?: number;
  seed?: number;
  color?: string;
  fontSizes?: number[];
}

export function generateStarFieldSVG(options: StarFieldOptions = {}): string {
  const {
    width = 1200,
    height = 1200,
    count = 90,
    seed = 42,
    color = "oklch(55.3% 0.013 58.071)",
    fontSizes = [10, 12, 14, 18],
  } = options;

  const rand = mulberry32(seed);

  const groups = new Map<number, string[]>();
  for (const size of fontSizes) {
    groups.set(size, []);
  }

  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * width);
    const y = Math.floor(rand() * height);
    const size = fontSizes[Math.floor(rand() * fontSizes.length)];

    groups.get(size)!.push(`<text x="${x}" y="${y}">*</text>`);
  }

  const groupElements: string[] = [];
  for (const [size, texts] of groups) {
    if (texts.length > 0) {
      groupElements.push(`<g font-size="${size}">`);
      groupElements.push(...texts);
      groupElements.push(`</g>`);
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
    `<style>text{fill:${color};font-family:monospace;</style>`,
    ...groupElements,
    `</svg>`,
  ].join("\n");
}
