import TagsPage from "@/components/Pages/Tags";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    // CHANGED: Translated and updated branding
    title: "Tags - Manga by PirateRuler.com",
    // CHANGED: Translated description
    description: "Browse manga by genre",
    // CHANGED: English keywords
    keywords: ["Tags", "Genre", "Manga", "Manga by PirateRuler.com"],
  };
}

export default function Page() {
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated 'Thể loại' to 'Tags' */}
        <h1 className="text-2xl font-black uppercase">Tags</h1>
      </div>

      <div className="w-full mt-4">
        <TagsPage />
      </div>
    </>
  );
}
