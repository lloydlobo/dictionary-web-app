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

      <section className="grid py-2 place-self-start">
        <Tab.Group>
          <Tab.List className="grid grid-cols-3 dark:bg-violet-900/[0.02] justify-between gap-0 rounded-xl p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "py-2.5 text-sm border-purple-400 font-medium leading-5 text-purple-400",
                    // "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2",
                    selected
                      ? "disabled:bg-white border-purple-400 border-b shadow"
                      : "text-purple-400 hover:bg-purple-100/[0.12] hover:text-white"
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
              <a
                // TODO: Add voice recognition button here or in input search bar.
                href={`https://google.com/search?q=${props.keyword}`}
                target="_blank"
              className="flex items-center no-underline py-24 lg:py-36 mx-auto w-fit "
              >
                <span
                  className={`gradient-border font-sans hover:scale-105 relative bg-zinc-900 flex items-center justify-center w-40 h-12 text-white text-sm`}
                >I am feeling lucky!</span>
              </a>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
      <style jsx>{
        `
    .gradient-border{
    --border-width: 2px;
    border-radius: var(--border-width);
    }
    .gradient-border:after{
    content: '';
    position: absolute;
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    height: calc(100% + var(--border-width) * 2);
    width: calc(100% + var(--border-width) * 2);
    border-radius: calc(2 * var(--border-width));
    background: linear-gradient(60deg, #e78524, #f36144, #de4d6a, #a056ba, #6163a7, #1188ac, #16a48a, #6fcb75);
    z-index: -1;
    animation: animate-gradient 3s ease alternate infinite;
    background-size: 300% 300%;

    }

    @keyframes animate-gradient {
    from, to {
    background-position: 0% 50%;
    }
    50% {
    background-position: 100% 50%;
    }
    }
    `
      }</style>
    </>
  );
}

function ResultsJSON(props: { results: Dictionary | null; keyword: string }) {
  let dict = props.results;
  if (dict === null || typeof dict === "undefined") {
    return (
      <section className="">
        <p className="dark:text-red-300 tracking-wide">
          <em className="hidden">{props.keyword}</em> Not Found!
        </p>
      </section>
    );
  } else {
    return (
      <section>
        <div className="flex items-center justify-end">
          <div className="sr-only">
            {props.results ? <span>{props.results.word} </span> : <>Oops</>}
          </div>
        </div>
        <div className="space-y-3 w-[83vw] flex flex-col md:w-auto relative text-xs overflow-x-scroll container">
          <div className="opacity-80 relative ml-auto">
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
          className="prose-sm  justify-between flex  items-center transition-transform gap-0.5 text-end "
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <span className="text-purple-400 transition-opacity animate-pulse dark:text-primary">Copied</span>
          ) : (
            <span className="font-bold tracking-wider decoration-green-400 underline-offset-8 dark:decoration-accent">
              Copy{" "}
            </span>
          )}
          <div className="scale-75 flex-shrink-0">
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
        className="w-6 h-6"
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
