import GroupInfo from "@/components/Groups/group-info";
import { siteConfig } from "@/config/site";
import { getGroup } from "@/lib/mangadex/group";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const group = await getGroup(id);
    return {
      // CHANGED: Updated branding
      title: `${group.name} - Manga by PirateRuler.com`,
      // CHANGED: Translated description and updated branding
      description: group.description
        ? group.description
        : `Scanlation group info ${group.name} - Manga by PirateRuler.com`,
      // CHANGED: Updated keywords
      keywords: [`Manga`, `${group.name}`, "Manga by PirateRuler.com"],

      openGraph: {
        // CHANGED: Updated branding
        title: `${group.name} - Manga by PirateRuler.com`,
        // CHANGED: Updated branding
        siteName: "Manga by PirateRuler.com",
        // CHANGED: Translated description and updated branding
        description: group.description
          ? group.description
          : `Scanlation group info ${group.name} - Manga by PirateRuler.com`,
        images: `${siteConfig.mangadexAPI.ogURL}/group/${group.id}`,
      },
    };
  } catch (error) {
    return { title: "Error 😭" }; // CHANGED: Translated error
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <GroupInfo id={id} />;
}
