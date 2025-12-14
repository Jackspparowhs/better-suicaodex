import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleHelp, MonitorCog, NotepadText } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import Notifications from "@/components/Notifications/notifications";

interface pageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export function generateMetadata(): Metadata {
  return {
    // CHANGED: Translated title and updated branding
    title: "Notifications - Manga by PirateRuler.com",
  };
}

export default async function Page({ searchParams }: pageProps) {
    const { page } = await getSearchParams({ searchParams });
  const tabValues = [
    {
      value: "noti",
      // CHANGED: Translated "Truyện" to "Manga"
      label: "Manga",
      icon: <NotepadText size={16} className="mr-1" />,
    },
    {
      value: "system",
      // CHANGED: Translated "Hệ thống" to "System"
      label: "System",
      icon: <MonitorCog size={16} className="mr-1" />,
    },
  ];
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated Header */}
        <h1 className="text-2xl font-black uppercase">Notifications</h1>
      </div>

      <Tabs defaultValue="noti" className="mt-4">
        <TabsList className="w-full">
          {tabValues.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="w-full flex items-center"
              value={tab.value}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="noti">
        <Accordion
            type="single"
            collapsible
            className="bg-secondary rounded-md px-2 mb-2"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="py-2">
                <div className="flex items-center gap-1.5">
                  {/* CHANGED: Translated trigger text */}
                  <CircleHelp size={18} /> Things to know:
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                {/* CHANGED: Translated notification warning */}
                New manga notifications are saved on your device; if you clear your browser data, notifications will also be deleted.
                <br />
                Due to this limitation, sometimes there may be no notification even if a manga has new chapters (this will be fixed when the account feature is implemented, hopefully 🐧).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Notifications page={page} />
        </TabsContent>
        <TabsContent value="system">
          <Alert className="rounded-sm bg-secondary justify-center text-center">
            {/* CHANGED: Translated empty state */}
            No notifications!
          </Alert>
        </TabsContent>
      </Tabs>
    </>
  );
}

const getSearchParams = async ({ searchParams }: pageProps) => {
  const params = await searchParams;
  const page = params["page"] ? parseInt(params["page"]) : 1;

  return { page };
};
