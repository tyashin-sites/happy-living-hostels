import {
  AirVent,
  Wind,
  Trees,
  Wifi,
  ShieldCheck,
  WashingMachine,
  Dices,
  UtensilsCrossed,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export type Facility = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const facilities: Facility[] = [
  {
    title: "AC Rooms Available",
    description: "Climate-controlled rooms so every season feels like home.",
    icon: AirVent,
  },
  {
    title: "Fully Ventilated Rooms",
    description: "Bright, airy interiors with plenty of natural light and airflow.",
    icon: Wind,
  },
  {
    title: "Park Facing Rooms",
    description: "Wake up to greenery with rooms overlooking the neighborhood park.",
    icon: Trees,
  },
  {
    title: "High-Speed WiFi",
    description: "Reliable internet for studies, work calls and weekend binge nights.",
    icon: Wifi,
  },
  {
    title: "24x7 Security",
    description: "CCTV surveillance, secured entry and round-the-clock supervision.",
    icon: ShieldCheck,
  },
  {
    title: "Laundry Facility",
    description: "On-premise washing facility so laundry is never a worry.",
    icon: WashingMachine,
  },
  {
    title: "Indoor Games",
    description: "Carrom, chess and more to unwind after a long day.",
    icon: Dices,
  },
  {
    title: "Delicious Food",
    description: "Three homely meals a day — nutritious, hygienic and flavourful.",
    icon: UtensilsCrossed,
  },
  {
    title: "Medical Facilities",
    description: "First-aid on site and quick access to nearby doctors and pharmacies.",
    icon: HeartPulse,
  },
];
