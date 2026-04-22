import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const EXPERIENCE_DIRECTORY = path.join(process.cwd(), "content/experience");

export type ExperienceEntry = {
  company: string;
  logo?: string;
  logoAlt?: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
  tech: string[];
  order: number;
  summary: string;
};

function parseExperienceFile(filePath: string): ExperienceEntry | null {
  try {
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      company: String(data.company ?? ""),
      logo: data.logo ? String(data.logo) : undefined,
      logoAlt: data.logoAlt ? String(data.logoAlt) : undefined,
      role: String(data.role ?? ""),
      startDate: String(data.startDate ?? ""),
      endDate: String(data.endDate ?? ""),
      location: String(data.location ?? ""),
      bullets: Array.isArray(data.bullets) ? data.bullets.map(String) : [],
      tech: Array.isArray(data.tech) ? data.tech.map(String) : [],
      order: Number(data.order ?? 999),
      summary: content.trim(),
    };
  } catch {
    return null;
  }
}

export function getAllExperienceEntries(): ExperienceEntry[] {
  try {
    if (!fs.existsSync(EXPERIENCE_DIRECTORY)) {
      return [];
    }

    return fs
      .readdirSync(EXPERIENCE_DIRECTORY)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => parseExperienceFile(path.join(EXPERIENCE_DIRECTORY, fileName)))
      .filter((entry): entry is ExperienceEntry => Boolean(entry?.company))
      .sort((left, right) => left.order - right.order);
  } catch {
    return [];
  }
}
