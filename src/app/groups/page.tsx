import { Metadata } from "next";
import GroupsSearch from "@/components/Groups/groups-search";

interface pageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export function generateMetadata(): Metadata {
  return {
    // CHANGED: Translated title and updated branding
    title: "Scanlation Groups - Manga by PirateRuler.com",
    // description: "Scanlation Groups",
    // keywords: ["Scanlation Groups", "Groups", "Manga by PirateRuler.com"],
  };
}
export default async function Page({ searchParams }: pageProps) {
  const { page, q } = await getSearchParams({ searchParams });

  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated 'Nhóm dịch' to 'Scanlation Groups' */}
        <h1 className="text-2xl font-black uppercase">Scanlation Groups</h1>
      </div>

      <div className="mt-4">
        <GroupsSearch page={page} q={q} />
      </div>
    </>
  );
}

const getSearchParams = async ({ searchParams }: pageProps) => {
  const params = await searchParams;

  const page = params["page"] ? parseInt(params["page"]) : 1;
  const q = params["q"] || "";

  return { page, q };
};
