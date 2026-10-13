export type Client = {
  id: string;
  name: string;
  logo: string;
};

export const clients: Client[] = [
  { id: "toronto", name: "City of Toronto", logo: "/images/clients/fit/toronto.png" },
  { id: "ontario", name: "Ontario Government", logo: "/images/clients/fit/ontario.png" },
  { id: "transport-canada", name: "Transport Canada", logo: "/images/clients/fit/canada.png" },
  { id: "cfia", name: "Canadian Food Inspection Agency", logo: "/images/clients/fit/canada.png" },
  { id: "isc", name: "Indigenous Services Canada", logo: "/images/clients/fit/canada.png" },
  { id: "bell", name: "Bell Canada", logo: "/images/clients/fit/bell.png" },
  { id: "twtelecom", name: "Time Warner Telecom", logo: "/images/clients/fit/twtelecom.png" },
  { id: "ecs", name: "ECS Team", logo: "/images/clients/fit/ecs.png" },
  { id: "emergitel", name: "EmergiTEL", logo: "/images/clients/fit/emergitel.png" },
  { id: "shaw", name: "Shaw Communications", logo: "/images/clients/fit/shaw.png" },
  { id: "telus", name: "TELUS", logo: "/images/clients/fit/telus.png" },
];
