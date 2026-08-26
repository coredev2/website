import {
  CodeIcon,
  DeviceIcon,
  FlagIcon,
  MegaphoneIcon,
  ShieldIcon,
  SignalIcon,
  SparklesIcon,
  WrenchIcon,
  type IconProps,
} from "@/components/ui/icons";
import type { Service } from "@/data/services";

export const serviceIconMap: Record<
  Service["icon"],
  (props: IconProps) => React.JSX.Element
> = {
  sparkles: SparklesIcon,
  shield: ShieldIcon,
  code: CodeIcon,
  device: DeviceIcon,
  wrench: WrenchIcon,
  megaphone: MegaphoneIcon,
  flag: FlagIcon,
  signal: SignalIcon,
};
