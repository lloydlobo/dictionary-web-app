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
            <a href="https://google.com/search?q=Love">I am feeling lucky!</a>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
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
        {props.results ? <span>{props.results.word} </span> : <>Oops</>}
        <div className="space-y-12 text-xs overflow-x-scroll container">
          <pre>{JSON.stringify(props.results, null, 2)}</pre>
        </div>
      </section>
    );
  }
}

export const DATA = [
  {
    word: "hello",
    phonetics: [
      {
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=75797336",
        license: {
          name: "BY-SA 4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0",
        },
      },
      {
        text: "/həˈləʊ/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9021983",
        license: {
          name: "BY 3.0 US",
          url: "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      { text: "/həˈloʊ/", audio: "" },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: '"Hello!" or an equivalent greeting.',
            synonyms: [],
            antonyms: [],
          },
        ],
        synonyms: ["greeting"],
        antonyms: [],
      },
      {
        partOfSpeech: "verb",
        definitions: [
          { definition: 'To greet with "hello".', synonyms: [], antonyms: [] },
        ],
        synonyms: [],
        antonyms: [],
      },
      {
        partOfSpeech: "interjection",
        definitions: [
          {
            definition:
              "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
            synonyms: [],
            antonyms: [],
            example: "Hello, everyone.",
          },
          {
            definition: "A greeting used when answering the telephone.",
            synonyms: [],
            antonyms: [],
            example: "Hello? How may I help you?",
          },
          {
            definition:
              "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
            synonyms: [],
            antonyms: [],
            example: "Hello? Is anyone there?",
          },
          {
            definition:
              "Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.",
            synonyms: [],
            antonyms: [],
            example:
              "You just tried to start your car with your cell phone. Hello?",
          },
          {
            definition: "An expression of puzzlement or discovery.",
            synonyms: [],
            antonyms: [],
            example: "Hello! What’s going on here?",
          },
        ],
        synonyms: [],
        antonyms: ["bye", "goodbye"],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/hello"],
  },
];
