import Gacha from "@/components/Pages/Gacha";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    // CHANGED: Updated branding
    title: "Gacha Simulator - Manga by PirateRuler.com",
    // CHANGED: Translated description and updated branding
    description: "Manga by PirateRuler.com - The ultimate Gacha experience",
    // CHANGED: Updated keywords
    keywords: ["Gacha", "Manga by PirateRuler.com", "Blue Archive", "Pokemon TCG", "Honkai Star Rail"],
  };
}

export default function Page() {
  return <Gacha />;
}
