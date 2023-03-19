import { Results } from "@/pages";
import { Dictionary } from "@/utils/sample-dict";
import { Tab } from "@headlessui/react";
import { useState } from "react";

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
    <section className="grid py-4 place-self-start">
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
              {props.results ? <span>{props.results.word} </span> : <>Oops</>}
            </>
          </Tab.Panel>
          <Tab.Panel>
            <a href="https://google.com/search?q=Love">I am feeling lucky!</a>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
