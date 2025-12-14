import NotFound from "@/app/not-found";
import TagPage from "@/components/Pages/Tags/Tag";
import { getTagById } from "@/lib/mangadex/tag";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { page } = await getSearchParams(searchParams);
  try {
    const tag = await getTagById(id);
    if (!tag) {
      return { title: "404 Not Found" };
    }
    return {
      title:
        page > 1
          ? `Page ${page} - ${tag.name} - Manga by PirateRuler.com` // CHANGED: Updated branding
          : `${tag.name} - Manga by PirateRuler.com`, // CHANGED: Updated branding
      description: `Manga in genre ${tag.name}`, // CHANGED: Translated description
      // CHANGED: Updated keywords
      keywords: ["Tags", "Genre", tag.name, tag.group, "Manga by PirateRuler.com"],
    };
  } catch (error) {
    console.log(error);
    return { title: "Error 😭" }; // CHANGED: Translated error
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { page } = await getSearchParams(searchParams);
  try {
    const tag = await getTagById(id);
    if (!tag) {
      return <NotFound />;
    }
    return (
      <>
        <div>
          <hr className="w-9 h-1 bg-primary border-none" />
          {/* The tag name usually comes from the API in English if configured correctly */}
          <h1 className="text-2xl font-black uppercase">{tag.name}</h1>
        </div>

        <TagPage id={id} page={page} />

        {/* <div className="w-full mt-4">
          <TagPage id={id} page={page} />
        </div> */}
      </>
    );
  } catch (error) {
    console.log("Error fetching tag:", error);
    return <div>Error 😭</div>; // CHANGED: Translated error
  }
}

const getSearchParams = async (
  searchParams: Promise<{ [key: string]: string | undefined }>
) => {
  const params = await searchParams;
  const page = params["page"] ? parseInt(params["page"]) : 1;
  return { page };
};
