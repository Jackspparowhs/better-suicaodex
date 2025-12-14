import Latest from "@/components/Pages/Latest";
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
        ? "Latest Updates - Manga by PirateRuler.com" // CHANGED: Updated branding
        : `Page ${page} - Latest Updates - Manga by PirateRuler.com`, // CHANGED: Updated branding
    // CHANGED: Translated description
    description: "Latest manga updates",
    // CHANGED: Updated keywords
    keywords: ["Latest Updates", "Manga", "Manga by PirateRuler.com"],
  };
}

export default async function Page({ searchParams }: pageProps) {
  const { page, limit } = await getSearchParams({ searchParams });
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated 'mới cập nhật' to 'Latest Updates' */}
        <h1 className="text-2xl font-black uppercase">Latest Updates</h1>
      </div>
      <div className="mt-4">
        <Latest page={page} limit={limit} />
      </div>
    </>
  );
}

const getSearchParams = async ({ searchParams }: pageProps) => {
  const params = await searchParams;

  const page = params["page"] ? parseInt(params["page"]) : 1;
  let limit = params["limit"] ? parseInt(params["limit"]) : 32;
  //Non-feed limit query param may not be >100
  if (limit > 100) limit = 100;

  return {
    page,
    limit,
  };
};
