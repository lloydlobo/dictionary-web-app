import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Inter, Source_Serif_Pro } from 'next/font/google'
import localFont from "next/font/local";

import "@/styles/globals.css";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const source_serif_pro = Source_Serif_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-source-serif-pro',
})

// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";
// import type { Component } from "react";

/*
 * Dictionary web app
 * https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL
 * In this project, you'll integrate with the Dictionary API to create a real-world dictionary web app.
 * Additional tests include colour themes and font selection.
 */

const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any): JSX.Element {

  // html { font-family: ${inter.style.fontFamily}, ${source_serif_pro.style.fontFamily} !important; }
  return (
    <>
      <style jsx global>{`
        :root {
        --font-sans: ${inter.style.fontFamily};
        --font-serif: ${source_serif_pro.style.fontFamily};
        --font-family: var(--font-serif);
        }

        html { 
          font-family: var(--font-family) !important; 
        }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          forcedTheme={Component.theme || undefined}
          attribute="class"
        >
          <div
            // ${charterRegularFont.variable} ${ibmRegular.variable} 
            className={`${inter.variable} ${source_serif_pro.variable}`}
          >
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}


// // Font files can be colocated inside of `pages`
// const charterRegularFont = localFont({
//   src: "./fonts/Charter/charter_regular.woff2",
//   variable: "--font-charter",
// });
//
// const ibmRegular = localFont({
//   variable: "--font-ibm",
//   src: [
//     {
//       path: "./fonts/ibm-plex/IBMPlexSans-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
// });
