export const processSteps = [
  "research",
  "planning",
  "design",
  "development",
  "testing",
  "launch",
  "support",
] as const;

export type ProcessStepId = (typeof processSteps)[number];
