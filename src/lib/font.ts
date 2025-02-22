import {
  Bricolage_Grotesque,
  Exo_2,
  Sora,
  Space_Mono,
  Instrument_Serif,
  Inter,
} from "next/font/google";

const sora = Sora({ subsets: ["latin"] });
const exo = Exo_2({
  subsets: ["latin"],
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

export { sora, spaceMono, exo, bricolage, instrumentSerif, inter };
