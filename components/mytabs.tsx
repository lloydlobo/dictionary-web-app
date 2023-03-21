import { Results } from "@/pages";
import { Dictionary } from "@/utils/sample-dict";
import { Tab } from "@headlessui/react";
import React, { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function MyTabs(props: { results: Dictionary | null; keyword: string }) {
  let [categories] = useState({
    All: [
      // { id: 1, title: "Does drinking coffee make you smarter?", date: "5h ago", commentCount: 5, shareCount: 2, },
      // { id: 2, title: "So you've bought coffee... now what?", date: "2h ago", commentCount: 3, shareCount: 2, },
    ],
    JSON: [
      // { id: 1, title: "Is tech making coffee better or worse?", date: "Jan 7", commentCount: 29, shareCount: 16, },
      // { id: 2, title: "The most innovative things happening in coffee", date: "Mar 19", commentCount: 24, shareCount: 12, },
    ],
    Lucky: [
      // { id: 1, title: "Ask Me Anything: 10 answers to your questions about coffee", date: "2d ago", commentCount: 9, shareCount: 5, },
      // { id: 2, title: "The worst advice we've ever heard about coffee", date: "4d ago", commentCount: 1, shareCount: 2, },
    ],
  });
  return (
    <>
      <section className="grid place-self-start py-2 transition">
        <Tab.Group>
          <Tab.List className="grid grid-cols-3 justify-between gap-0 overflow-clip rounded-xl bg-violet-400/[0.15] p-0 dark:bg-violet-900/[0.02]">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "prose-sm border-purple-600 py-2.5 font-medium leading-5 dark:border-purple-400 dark:text-purple-400",
                    // "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2",
                    selected
                      ? "dark:border-purple-40 border-b border-purple-600  text-purple-800 disabled:bg-white"
                      : "text-purple-500 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 disabled:dark:hover:bg-purple-100/[0.12]"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={`mt-6`}>
            <Tab.Panel>
              <>
                <Results results={props.results} keyword={props.keyword} />
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <ResultsJSON results={props.results} keyword={props.keyword} />
              </>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid place-self-center">
                <div className="flex justify-between">
                  <h1 className="mn-2 pb-2">
                    {props.results ? (
                      <span>{props.results.word} </span>
                    ) : (
                      <>Oops</>
                    )}
                  </h1>
                  <a
                    // TODO: Add voice recognition button here or in input search bar.
                    href={`https://google.com/search?q=${props.keyword}`}
                    target="_blank"
                    className="no-underline"
                  >
                    <span
                      className={`gradient-border relative flex h-10 w-36 items-center justify-center bg-zinc-900 font-sans text-sm text-white hover:scale-105 md:h-12 md:w-40`}
                    >
                      I am feeling lucky!
                    </span>
                  </a>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
      <style jsx>{`
        .gradient-border {
          --border-width: 2px;
          border-radius: var(--border-width);
        }
        .gradient-border:after {
          content: "";
          position: absolute;
          top: calc(-1 * var(--border-width));
          left: calc(-1 * var(--border-width));
          height: calc(100% + var(--border-width) * 2);
          width: calc(100% + var(--border-width) * 2);
          border-radius: calc(2 * var(--border-width));
          background: linear-gradient(
            60deg,
            #e78524,
            #f36144,
            #de4d6a,
            #a056ba,
            #6163a7,
            #1188ac,
            #16a48a,
            #6fcb75
          );
          background-size: 300% 300%;
          z-index: -1;
          animation: animate-gradient 3s ease alternate infinite;
          -webkit-animation: animate-gradient 3s ease alternate infinite;
        }

        @keyframes animate-gradient {
          from,
          to {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
}

function ResultsJSON(props: { results: Dictionary | null; keyword: string }) {
  let dict = props.results;
  if (dict === null || typeof dict === "undefined") {
    return (
      <section className="">
        <p className="tracking-wide dark:text-red-300">
          <em className="hidden">{props.keyword}</em> Not Found!
        </p>
      </section>
    );
  } else {
    return (
      <section>
        <div className="flex items-center justify-start">
          <h1 className="mb-2 pb-2">
            {props.results ? <span>{props.results.word} </span> : <>Oops</>}
          </h1>
        </div>
        <div className="container relative flex w-[83vw] flex-col space-y-3 overflow-x-scroll text-xs md:w-auto">
          <div className="relative ml-auto opacity-80">
            <CopyToClipboard data={JSON.stringify(props.results, null, 2)} />
          </div>
          <pre>{JSON.stringify(props.results, null, 2)}</pre>
        </div>
      </section>
    );
  }
}

export const CopyToClipboard = (props: { data: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const contentToCopy = props.data;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contentToCopy);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div>
      <div>
        <button
          className="prose-sm  flex items-center  justify-between gap-0.5 text-end transition-transform "
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <span className="dark:text-primary animate-pulse text-purple-400 transition-opacity">
              Copied
            </span>
          ) : (
            <span className="dark:decoration-accent font-bold tracking-wider decoration-green-400 underline-offset-8">
              Copy{" "}
            </span>
          )}
          <div className="flex-shrink-0 scale-75">
            <CopyIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

function CopyIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
        />
      </svg>
    </>
  );
}
