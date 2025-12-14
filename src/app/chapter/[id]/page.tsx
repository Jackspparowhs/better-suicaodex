import Chapter from "@/components/Pages/Chapter/chapter";
import { siteConfig } from "@/config/site";
import { getChapterDetail } from "@/lib/mangadex/chapter";
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
    const res = await getChapterDetail(id);

    const chapterInx = res.chapter ? `Ch. ${res.chapter}` : "Oneshot";
    // CHANGED: Updated branding in title
    const title = [res.manga?.title, chapterInx, res.title, "Manga by PirateRuler.com"]
      .filter((x) => x)
      .join(" - ");

    return {
      title: title,
      // CHANGED: Translated description
      description: `Read ${title}`,
      openGraph: {
        title: title,
        // CHANGED: Updated branding
        siteName: "Manga by PirateRuler.com",
        // CHANGED: Translated description
        description: `Read ${title}`,
        images: `${siteConfig.mangadexAPI.ogURL}/chapter/${id}`,
      },
    };
  } catch (error: any) {
    if (error.status === 404) {
      return {
        // CHANGED: Translated error
        title: "Chapter Not Found",
      };
    } else if (error.status === 503) {
      return {
        // CHANGED: Translated error
        title: "Under Maintenance...",
      };
    } else {
      return {
        // CHANGED: Translated error
        title: "Error :(",
      };
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <Chapter id={id} />;
}
