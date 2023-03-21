import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { Component } from "react";

/*
 * Dictionary web app
 *
 * https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL
 *
 * In this project, you'll integrate with the Dictionary API
 * to create a real-world dictionary web app.
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
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
