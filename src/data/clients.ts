export type Client = {
  id: string;
  name: string;
  logo: string;
};

export const clients: Client[] = [
  { id: "toronto", name: "City of Toronto", logo: "/images/clients/fit/toronto.png" },
  { id: "isc", name: "Indigenous Services Canada", logo: "/images/clients/fit/isc.png" },
  { id: "bell", name: "Bell Canada", logo: "/images/clients/fit/bell.png" },
  { id: "twtelecom", name: "Time Warner Telecom", logo: "/images/clients/fit/twtelecom.png" },
  { id: "emergitel", name: "EmergiTEL", logo: "/images/clients/fit/emergitel.png" },
  { id: "shaw", name: "Shaw Communications", logo: "/images/clients/fit/shaw.png" },
  { id: "telus", name: "TELUS", logo: "/images/clients/fit/telus.png" },
];
