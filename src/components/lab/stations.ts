import { career, projects } from "@/data/portfolio";

export type LineKey = "android" | "ios" | "web";

export const LINES: Record<LineKey, { color: string; y: number; z: number; label: string }> = {
  android: { color: "#00a84d", y: 0, z: 0, label: "Android 선" },
  ios: { color: "#0052a4", y: -0.9, z: 0.7, label: "iOS 선" },
  web: { color: "#ef7c1c", y: 0.9, z: -0.7, label: "Web 선" },
};

export type Station = {
  name: string;
  x: number;
  year: number;
  lines: LineKey[];
  kind: "project" | "company";
  desc?: string;
  current?: boolean;
};

const X_PER_YEAR = 2.4;
const YEAR0 = 2015;

function yearOf(period?: string) {
  const y = parseInt(period?.slice(0, 4) ?? "", 10);
  const m = parseInt(period?.slice(5, 7) ?? "1", 10);
  return Number.isFinite(y) ? y + (Number.isFinite(m) ? (m - 1) / 12 : 0) : NaN;
}

function linesOf(role?: string): LineKey[] {
  const r = (role ?? "").toLowerCase();
  const out: LineKey[] = [];
  if (r.includes("android")) out.push("android");
  if (r.includes("ios")) out.push("ios");
  if (/frontend|backend|fullstack|web|\bfe\b|\bbe\b/.test(r)) out.push("web");
  return out.length ? out : ["android"];
}

function build(): Station[] {
  const list: Station[] = [];

  for (const c of career) {
    const year = yearOf(c.period);
    if (!Number.isFinite(year)) continue;
    list.push({
      name: c.company,
      year,
      x: 0,
      lines: ["android"],
      kind: "company",
      desc: c.projects[0],
      current: c.period.includes("재직"),
    });
  }

  for (const p of projects) {
    const year = yearOf(p.period);
    if (!Number.isFinite(year)) continue;
    list.push({
      name: p.title,
      year,
      x: 0,
      lines: linesOf(p.role),
      kind: "project",
      desc: p.description,
      current: p.period?.includes("현재"),
    });
  }

  list.sort((a, b) => a.year - b.year);

  // ponytail: naive spread so same-year stations don't overlap; layout engine if it ever matters
  let last = -Infinity;
  for (const s of list) {
    s.x = Math.max((s.year - YEAR0) * X_PER_YEAR, last + 1.1);
    last = s.x;
  }
  return list;
}

export const STATIONS = build();
export const MAP_MIN_X = Math.min(...STATIONS.map((s) => s.x));
export const MAP_MAX_X = Math.max(...STATIONS.map((s) => s.x));
