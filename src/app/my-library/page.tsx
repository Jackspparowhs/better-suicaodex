import { Metadata } from "next";
import { Alert } from "@/components/ui/alert";
import {
  Album,
  BookmarkCheck,
  CircleHelp,
  CircleUser,
  CloudOff,
  ListCheck,
  NotebookPen,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MyLibrary from "@/components/Pages/MyLibrary";
import { auth } from "@/auth";
import SyncLib from "@/components/Library/sync-lib";

export function generateMetadata(): Metadata {
  return {
    // CHANGED: Translated title and updated branding
    title: "Library - Manga by PirateRuler.com",
    // description: "Library",
    // keywords: ["Library", "History", "Manga by PirateRuler.com"],
  };
}
export default async function Page() {
  const session = await auth();
  // console.log(session);
  const tabValues = [
    { value: "following", icon: <BookmarkCheck /> },
    { value: "reading", icon: <Album /> },
    { value: "plan", icon: <NotebookPen /> },
    { value: "completed", icon: <ListCheck /> },
  ];
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        {/* CHANGED: Translated Header */}
        <h1 className="text-2xl font-black uppercase">Library</h1>
      </div>

      <Tabs defaultValue="local" className="mt-4">
        <TabsList className="w-full">
          <TabsTrigger className="w-full flex items-center" value="local">
            <CloudOff size={16} className="mr-1" />
            {/* CHANGED: Translated Tab Label */}
            From Device
          </TabsTrigger>
          <TabsTrigger className="w-full flex items-center" value="cloud">
            <CircleUser size={16} className="mr-1" />
            {/* CHANGED: Translated Tab Label */}
            From Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Accordion
            type="single"
            collapsible
            className="bg-secondary rounded-md px-2"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="py-2">
                <div className="flex items-center gap-1.5">
                  {/* CHANGED: Translated Trigger */}
                  <CircleHelp size={18} /> Things to know:
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                {/* CHANGED: Translated Warning Content */}
                This library is saved locally on your device and does not sync with your account. If you clear browser data, this library will be deleted.
                <br />
                Additionally, each category stores a maximum of 500 mangas; adding more will automatically delete the oldest ones.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Tabs defaultValue="following" className="mt-2">
            <TabsList className="rounded-sm gap-1 h-10">
              {tabValues.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  className="rounded-sm"
                  value={tab.value}
                >
                  {tab.icon}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabValues.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="w-full">
                <MyLibrary category={tab.value} />
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
        <TabsContent value="cloud">
          {!!session ? (
            <SyncLib session={session} />
          ) : (
            <Alert className="rounded-sm bg-secondary justify-center text-center">
              {/* CHANGED: Translated Login Prompt */}
              You need to log in to use this feature!
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
