"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import ErrorPage from "@/components/error-page";
// Note: Exporting 'metadata' from a Client Component technically doesn't work in Next.js 
// (it's ignored or throws a warning), but I have translated it just in case.
// To fix the title properly, you would usually put it in layout.tsx or a server wrapper.
// For now, I will just translate the strings as requested.

/* export const metadata: Metadata = {
  title: "Error 😭",
};
*/

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      error={error}
      reset={reset}
      statusCode={500}
      // CHANGED: Translated title
      title="Oops! Something went wrong"
      // CHANGED: Translated message
      message="An error occurred while displaying this page. Please check the error details below."
    />
  );
}
