import Recent from "@/components/Pages/Recent";
import { Metadata } from "next";

interface pageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export async function generateMetadata({
  searchParams,
}: pageProps): Promise<Metadata> {
  const { page } = await getSearchParams({ searchParams });
  return {
    title:
      page === 1
        ? "New Manga - Manga by PirateRuler.com" // CHANGED: Updated branding
        : `Page ${page} - New Manga - Manga by PirateRuler.com`, // CHANGED: Updated branding
    // CHANGED: Translated description
    description: "New manga, latest manga, updated manga",
    // CHANGED: Updated keywords
    keywords: ["New Manga", "Manga", "Manga by PirateRuler.com"],
  };
}
export default async function Page({ searchParams }: pageProps) {
  const { page } = await getSearchParams({ searchParams });

  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated 'Truyện mới' to 'New Manga' */}
        <h1 className="text-2xl font-black uppercase">New Manga</h1>
      </div>

      <Recent page={page} />
    </>
  );
}

const getSearchParams = async ({ searchParams }: pageProps) => {
  const params = await searchParams;

  const page = params["page"] ? parseInt(params["page"]) : 1;

  return { page };
};
