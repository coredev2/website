export type ProjectCategory = "web" | "mobile";

export type Project = {
  id: string;
  slug: string;
  category: ProjectCategory;
  image: string;
};

export const projects: Project[] = [
  {
    id: "halal-stage",
    slug: "halal-stage",
    category: "web",
    image: "/images/projects/halal-stage.png",
  },
  {
    id: "2sooq",
    slug: "2sooq",
    category: "mobile",
    image: "/images/projects/2sooq.png",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
