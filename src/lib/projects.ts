import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx/mdx-components";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content/projects");

export type Project = {
  title: string;
  slug: string;
  year: number;
  role: string;
  summary: string;
  tech: string[];
  thumbnail: string;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  order: number;
  client?: string;
  timeline?: string;
  body: string;
};

const prettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
  onVisitLine(node: { children: unknown[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

function sortProjects(left: Project, right: Project) {
  if (left.order !== right.order) {
    return left.order - right.order;
  }

  if (left.year !== right.year) {
    return right.year - left.year;
  }

  return left.title.localeCompare(right.title);
}

function parseProjectFile(filePath: string): Project | null {
  try {
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      title: String(data.title ?? ""),
      slug: String(data.slug ?? ""),
      year: Number(data.year ?? 0),
      role: String(data.role ?? ""),
      summary: String(data.summary ?? ""),
      tech: Array.isArray(data.tech) ? data.tech.map(String) : [],
      thumbnail: String(data.thumbnail ?? ""),
      featured: Boolean(data.featured),
      liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
      repoUrl: data.repoUrl ? String(data.repoUrl) : undefined,
      order: Number(data.order ?? 999),
      client: data.client ? String(data.client) : undefined,
      timeline: data.timeline ? String(data.timeline) : undefined,
      body: content,
    };
  } catch {
    return null;
  }
}

export function getAllProjects(): Project[] {
  try {
    if (!fs.existsSync(PROJECTS_DIRECTORY)) {
      return [];
    }

    return fs
      .readdirSync(PROJECTS_DIRECTORY)
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => parseProjectFile(path.join(PROJECTS_DIRECTORY, fileName)))
      .filter((project): project is Project => Boolean(project?.slug))
      .sort(sortProjects);
  } catch {
    return [];
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter((project) => project.featured)
    .slice(0, 3);
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((project) => project.slug === slug) ?? null;
}

export function getAllTechTags(): string[] {
  return Array.from(new Set(getAllProjects().flatMap((project) => project.tech))).sort((left, right) =>
    left.localeCompare(right),
  );
}

export function getAdjacentProjects(slug: string) {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1 || projects.length === 0) {
    return {
      next: null,
      previous: null,
    };
  }

  return {
    previous: projects[(currentIndex - 1 + projects.length) % projects.length] ?? null,
    next: projects[(currentIndex + 1) % projects.length] ?? null,
  };
}

export async function renderProjectBody(body: string) {
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return content;
}
