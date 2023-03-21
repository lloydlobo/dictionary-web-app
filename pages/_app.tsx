import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { Component } from "react";
import localFont from "next/font/local";
// import { SessionProvider } from "next-auth/react";

// Font files can be colocated inside of `pages`
const charterRegularFont = localFont({
  src: "./fonts/Charter/charter_regular.woff2",
  variable: "--font-charter",
});
const ibmRegular = localFont({
  variable: "--font-ibm",
  src: [
    {
      path: "./fonts/ibm-plex/IBMPlexSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});
/*
 * Dictionary web app
 *
 * https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL
 *
 * In this project, you'll integrate with the Dictionary API to create a real-world dictionary web app.
 * Additional tests include colour themes and font selection.
 */

const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any): JSX.Element {
  // : AppProps<{ session: Session }>
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        forcedTheme={Component.theme || undefined}
        attribute="class"
      >
        <div
          className={`
        ${ibmRegular.variable} 
        ${charterRegularFont.variable}
        font-[var(--font-charter)] 
        `}
        >
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
