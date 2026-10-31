/** Canvas-drawn art for the Finish Lab card (no image downloads). 1024×585 ≈ 3.5 × 2 in. */
export const CARD_W = 1024;
export const CARD_H = 585;

export type CardText = { brand: string; name: string; role: string; phone: string; email: string; city: string };

const INK = "#0E0E10";
const MAGENTA = "#EC008C";

function canvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = CARD_W;
  c.height = CARD_H;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  return [c, ctx];
}

function regMark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  const r = size / 2;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size / 14;
  ctx.beginPath();
  ctx.arc(x + r, y + r, r * 0.55, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + r, y + r, r * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + r, y + size);
  ctx.moveTo(x, y + r);
  ctx.lineTo(x + size, y + r);
  ctx.stroke();
  ctx.restore();
}

const FONT = "Bricolage Grotesque, Arial, sans-serif";
const MONO = "Geist Mono, ui-monospace, monospace";

/** Logo lock-up area, shared so the spot-UV and emboss layers line up exactly. */
const LOGO = { x: 84, y: 78, size: 96 };

function drawLogo(ctx: CanvasRenderingContext2D, color: string, brand: string) {
  regMark(ctx, LOGO.x, LOGO.y, LOGO.size, color);
  ctx.fillStyle = color;
  ctx.font = `700 72px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText(brand.split(" ")[0].toUpperCase(), LOGO.x + LOGO.size + 26, LOGO.y + LOGO.size / 2 + 4);
}

function drawName(ctx: CanvasRenderingContext2D, color: string, text: CardText) {
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  ctx.font = `600 58px ${FONT}`;
  ctx.fillText(text.name, 84, 404);
  ctx.font = `500 26px ${MONO}`;
  ctx.fillText(text.role.toUpperCase(), 86, 448);
}

export function drawFront(text: CardText, opts: { kraft: boolean; foilName: boolean }) {
  const [c, ctx] = canvas();
  ctx.fillStyle = opts.kraft ? "#C8A97E" : "#FBF9F4";
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  if (!opts.kraft) {
    ctx.fillStyle = MAGENTA;
    ctx.fillRect(0, 0, 26, CARD_H);
  }
  drawLogo(ctx, INK, text.brand);
  if (!opts.foilName) drawName(ctx, INK, text);
  ctx.fillStyle = opts.kraft ? "rgba(14,14,16,0.75)" : "rgba(14,14,16,0.62)";
  ctx.font = `500 26px ${MONO}`;
  ctx.textAlign = "right";
  [text.phone, text.email, text.city].forEach((line, i) => ctx.fillText(line, CARD_W - 84, 390 + i * 40));
  ctx.textAlign = "left";
  return c;
}

export function drawBack(text: CardText) {
  const [c, ctx] = canvas();
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  regMark(ctx, CARD_W / 2 - 70, CARD_H / 2 - 110, 140, "#F6F3EC");
  ctx.fillStyle = "#F6F3EC";
  ctx.font = `600 34px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText(text.brand, CARD_W / 2, CARD_H / 2 + 110);
  ctx.fillStyle = MAGENTA;
  ctx.fillRect(CARD_W / 2 - 40, CARD_H / 2 + 140, 80, 6);
  return c;
}

/** White-on-black masks for the spot UV, foil and emboss layers. */
export function drawLogoMask(brand: string) {
  const [c, ctx] = canvas();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  drawLogo(ctx, "#fff", brand);
  return c;
}

export function drawNameMask(text: CardText) {
  const [c, ctx] = canvas();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  drawName(ctx, "#fff", text);
  return c;
}

export function drawNoise(size = 256) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const v = 150 + Math.random() * 105;
    image.data[i] = v;
    image.data[i + 1] = v;
    image.data[i + 2] = v;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return c;
}
