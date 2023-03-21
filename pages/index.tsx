import Head from "next/head";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { Inter } from "next/font/google";
import { IBM_Plex_Serif } from "next/font/google";
import useSWR, { Fetcher } from "swr";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Dictionary } from "@/utils/sample-dict";
import { SkeletonLayout } from "@/components/skeleton";
import { MyTabs } from "@/components/mytabs";
import { ThemeToggler } from "@/components/theme-toggler";
import Layout from "@/components/layout";
const inter = Inter({ subsets: ["latin"] });
const ibm = IBM_Plex_Serif({ weight: "400", subsets: ["latin"] });
const URL = " https://api.dictionaryapi.dev/api/v2/entries/en";

const fetcher: Fetcher<any, string> = (id) => getDictByKeyword(id);

async function getDictByKeyword(keyword: string) {
  let url = `${URL}/${keyword}`;
  const res = await fetch(url);
  return await res.json();
}

export const SearchBar = (props: {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  useSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <>
      <section className="my-8">
        <form onSubmit={props.useSubmit}>
          <div className="relative grid w-full">
            <input
              type={"text"}
              className={`prose-sm w-full rounded-lg px-2 py-1 outline outline-purple-100 ring-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:outline-purple-200/40 dark:focus:ring-violet-700`}
              placeholder={"keyboard"}
              onChange={(event) => props.setSearch(event.currentTarget.value)}
            />
            <button>
              <SearchIcon
                className={`absolute right-3 top-0.5 scale-[80%] text-purple-400`}
              />
            </button>
          </div>
        </form>
        <sub className="debug hidden">Searching for {props.search}</sub>
      </section>
    </>
  );
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Dictionary | null>(null);
  const [loading, setLoading] = useState(false);

  const useSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    let data = await getDictByKeyword(search);
    setLoading(false);

    let dictionary: Dictionary = data[0];
    if (dictionary !== null) {
      setResults(dictionary);
    } else {
      setResults(null);
    }
  };

  const searchOnce = async (search: string) => {
    let data = await getDictByKeyword(search);
    setLoading(false);
    let dictionary: Dictionary = data[0];
    if (dictionary !== null) {
      setResults(dictionary);
    } else {
      setResults(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    searchOnce("keyboard");
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <Layout>
        <main
          className={`min-h-screen w-full px-8 md:px-0 ${ibm.className} font-serif`}
        >
          <SearchBar
            setSearch={setSearch}
            search={search}
            useSubmit={useSubmit}
          />
          {loading === false && results !== null ? (
            // {results !== null ? (
            <>
              <MyTabs results={results} keyword={search} />
              <div className="hidden">
                <Results results={results} keyword={search} />
              </div>
            </>
          ) : loading ? (
            <SkeletonLayout />
          ) : null}
        </main>
      </Layout>
    </>
  );
}

function PlayIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-12 fill-purple-100"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
          clipRule="evenodd"
          className="fill-purple-400"
        />
      </svg>
    </>
  );
}

export const Results = (props: {
  results: Dictionary | null;
  keyword: string;
}) => {
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
      <div className="">
        <section className="">
          <div className="flex justify-between">
            <div className="grid">
              <h1 className="mb-2 pb-2">
                {dict ? <span>{dict.word}</span> : <>&nbsp;</>}
              </h1>
              <div className="prose-sm dark:text-violet-400">
                {dict ? (
                  <div className="inline-flex gap-x-2">
                    {dict.phonetics.map((x, index) => (
                      <a
                        href={x.audio}
                        className="prose-sm no-underline dark:text-violet-400"
                        key={`phonetics-${index}`}
                      >
                        {x.text}
                      </a>
                    ))}{" "}
                  </div>
                ) : (
                  <span>n.a</span>
                )}
              </div>
            </div>
            <div className="stroke-purple-400">
              <PlayIcon />
            </div>
          </div>
        </section>

        <section>
          <div className="">
            {!dict ? (
              <span>...</span>
            ) : (
              dict.meanings.map((meaning, index) => (
                <div key={`meaning-definitions-${meaning}-${index}`}>
                  <div className="prose-base mt-8 flex h-8 items-center gap-8">
                    <h2 className="prose-lg relative w-fit">
                      {meaning.partOfSpeech}
                    </h2>

                    <span className="hidden w-full flex-1">
                      <hr className="h-4 w-full min-w-[30vw] max-w-[80vw]"></hr>
                    </span>
                  </div>

                  <h3 className="prose-sm opacity-50">Meaning</h3>

                  <ul className="">
                    {meaning.definitions.map((y, idx) => (
                      <li className="" key={`definitions-${y}-${idx}`}>
                        <p className="my-0 py-0">{y.definition}</p>

                        <div className="">
                          {y.synonyms.map((z, idx) => (
                            <div key={`synonym-definition-${y}-${idx}`}>
                              {z}{" "}
                            </div>
                          ))}
                        </div>

                        <div className="">
                          {y.antonyms.map((z, idx) => (
                            <div key={`antonyms-definition-${y}-${idx}`}>
                              {z}
                            </div>
                          ))}
                        </div>

                        <div className="opacity-70">{y.example}</div>
                      </li>
                    ))}
                  </ul>

                  <div
                    key={`meaning-synonym-${meaning}-${index}`}
                    className="flex items-baseline"
                  >
                    <h3 className="prose-sm  opacity-50">Synonyms</h3>
                    <ul className="prose-sm flex list-none flex-wrap items-center gap-2">
                      {meaning.synonyms.map((synonym, idx) => (
                        <div key={`synonym-${synonym}-${idx}`}>
                          <a href={`https://google.com/search?q=${synonym}`}>
                            {synonym}
                          </a>
                        </div>
                      ))}
                    </ul>
                  </div>

                  <div
                    key={`meaning-antonym-${meaning}-${index}`}
                    className="flex items-baseline"
                  >
                    <h3
                      key={`heading-antonym-${meaning}`}
                      className="prose-sm  brightness-50"
                    >
                      Antonyms
                    </h3>

                    <ul className="prose-sm flex list-none flex-wrap items-center gap-2">
                      {meaning.antonyms.map((antonym, idx) => (
                        <div key={`${idx}-synonym-${antonym}-${idx}`}>
                          <a href={`https://google.com/search?q=${antonym}`}>
                            {antonym}
                          </a>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mb-24">
          <span className="w-full flex-1">
            <hr className="h-4 w-full min-w-[30vw] max-w-[80vw]"></hr>
          </span>
          <div className="flex items-baseline gap-x-2">
            <h2 className="prose-sm text-sm font-normal dark:opacity-30">
              Source
            </h2>
            <ul className="list-none">
              {dict &&
                dict.sourceUrls.map((x, index) => (
                  <li
                    className="flex items-center gap-0 prose-a:prose-sm"
                    key={`meaning-${x}-${index}`}
                  >
                    <a
                      className="
									inline-flex
									"
                      href={x}
                    >
                      {x}
                      <div className="scale-50">
                        <LinkIcon />
                      </div>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
    );
  }
};

export function SearchIcon({ className }: { className: string }): JSX.Element {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: "Team", href: "#", current: false },
  { name: "Words", href: "/words", current: false },
  // { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const LinkIcon = () => {
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
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </>
  );
};

const MoonIcon = () => {
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
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </>
  );
};
const SunIcon = () => {
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
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    </>
  );
};
