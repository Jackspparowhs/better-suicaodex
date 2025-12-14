import ErrorPage from "@/components/error-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  // CHANGED: Updated branding
  title: "404 Not Found - Manga by PirateRuler.com",
};

export default function NotFound() {
  return (
    <ErrorPage 
      statusCode={404}
      // CHANGED: Translated title
      title="Page Not Found"
      // CHANGED: Translated error message
      message="It seems like the page you are looking for has been moved, deleted, or does not exist. Try going back to the homepage or searching for other content."
    />
  );
}
