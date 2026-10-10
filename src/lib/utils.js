const BN = "০১২৩৪৫৬৭৮৯";

export const toBn = (v) => String(v).replace(/\d/g, (d) => BN[d]);

// 1850 -> "১,৮৫০"
export const bnPrice = (n) =>
  toBn(Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 }));

const UNITS = {
  kg: "কেজি",
  g: "গ্রাম",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  ltr: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};

export const unitBn = (u) => UNITS[String(u || "").toLowerCase()] || u || "";

export const bnDate = (date = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);

export const topRisers = (list, n = 6) =>
  list
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, n);

export const topFallers = (list, n = 6) =>
  list
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, n);
