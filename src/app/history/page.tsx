import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import History from "@/components/Pages/History";


export function generateMetadata(): Metadata {
  return {
    // CHANGED: Translated title and updated branding
    title: "Reading History - Manga by PirateRuler.com",
    // CHANGED: Translated description
    description: "Reading History",
    // CHANGED: Updated keywords
    keywords: ["History", "Reading History", "Manga by PirateRuler.com"],
  };
}
export default function Page() {
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated Header */}
        <h1 className="text-2xl font-black uppercase">Reading History</h1>
      </div>

      <Alert className="mt-4 rounded-sm bg-secondary">
        <Terminal size={18} />
        {/* CHANGED: Translated Alert Title */}
        <AlertTitle>Things to know:</AlertTitle>
        {/* CHANGED: Translated Alert Description */}
        <AlertDescription>
          Reading history is saved locally on your device. If you clear your browser data, your history will also be deleted.
        </AlertDescription>
      </Alert>

      <div className="mt-4">
        <History />
      </div>
    </>
  );
}
