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

const inter = Inter({ subsets: ["latin"] });
const ibm = IBM_Plex_Serif({ weight: "400", subsets: ["latin"] });
const URL = " https://api.dictionaryapi.dev/api/v2/entries/en";

// const myLoader = (props: { src: string, width: number, quality: number }) => {
//   return `${props.src}?w=${props.width}&q=${props.quality || 75}`;
// };

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
          <div className="w-full grid relative">
            <input
              type={"text"}
              className={`px-2 w-full py-1 prose-sm outline outline-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 rounded-lg`}
              placeholder={"keyboard"}
              onChange={(event) => props.setSearch(event.currentTarget.value)}
            />

            <button>
              <SearchIcon
                className={`absolute right-3 text-purple-400 top-0.5 scale-[80%]`}
              />
            </button>
          </div>
        </form>

        <sub className="hidden debug">Searching for {props.search}</sub>
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
      <Head>
        <title>Dictionary Web App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="grayscale-[49%] container prose prose-lg mx-auto">
        <Navbar />
      </header>
      <main className={`px-8 min-h-screen w-full ${ibm.className} font-serif`}>
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
        className="fill-purple-100 h-full w-12"
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
        <p className="dark:text-red-300 tracking-wide">
          <em className="hidden">{props.keyword}</em> Not Found!
        </p>
      </section>
    );
  } else {
    return (
      <div className="space-y-12">
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
                        className="prose-sm dark:text-violet-400 no-underline"
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
                  <div className="flex gap-8 items-center h-8 mt-8 prose-base">
                    <h2 className="w-fit relative prose-lg">
                      {meaning.partOfSpeech}
                    </h2>

                    <span className="w-full flex-1">
                      <hr className="max-w-[80vw] h-4 min-w-[30vw] w-full"></hr>
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
                    <ul className="list-none gap-2 flex-wrap items-center flex prose-sm">
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

                    <ul className="list-none gap-2 flex-wrap items-center flex prose-sm">
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
            <hr className="max-w-[80vw] h-4 min-w-[30vw] w-full"></hr>
          </span>
          <div className="flex items-baseline gap-x-2">
            <h2 className="prose-sm text-sm font-normal dark:opacity-30">
              Source
            </h2>
            <ul className="list-none">
              {dict &&
                dict.sourceUrls.map((x, index) => (
                  <li
                    className="flex gap-0 items-center prose-a:prose-sm"
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
        className="w-6 h-6"
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
  { name: "Home", href: "#", current: true },
  // { name: "Team", href: "#", current: false },
  { name: "Words", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-0">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <span>Dictionary</span> : <span>Dictionary</span>}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    // placeholder="blur"
                    // loader={myLoader}
                    width={32}
                    height={32}
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=200"
                    alt="Your Company"
                  />
                  <img
                    width={32}
                    height={32}
                    // loader={myLoader}
                    // placeholder="blur"
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:grid place-self-center">
                  <div className="flex gap-x-4 items-baseline">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 rounded-full flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="  hidden rounded-full bg-gray-800  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="relative blur-[1px] pointer-events-none ml-3"
                >
                  <div className="h-8 relative w-8">
                    <Menu.Button className="rounded-full inset-0 relative h-full w-full grid active:outline-white">
                      <span className="hidden">Open user menu</span>
                      <MoonIcon />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
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
        className="w-6 h-6"
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
        className="w-6 h-6"
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
        className="w-6 h-6"
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
