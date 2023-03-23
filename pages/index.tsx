import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IBM_Plex_Serif } from "next/font/google";
import useSWR, { Fetcher } from "swr";

import { Dictionary } from "@/utils/sample-dict";
import { SkeletonLayout } from "@/components/skeleton";
import { MyTabs } from "@/components/mytabs";
import Layout from "@/components/layout";
import useSound from "use-sound";
import { LinkIcon, PlayIcon, SearchIcon } from "@/components/icons";

const ibm = IBM_Plex_Serif({ weight: "400", subsets: ["latin"] });

const URL = " https://api.dictionaryapi.dev/api/v2/entries/en";

const fetcher: Fetcher<any, string> = (id) => getDictByKeyword(id);

async function getDictByKeyword(keyword: string) {
  let url = `${URL}/${keyword}`;
  const res = await fetch(url);
  return await res.json();
}

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
            <MyTabs results={results} keyword={search} />
          ) : loading ? (
            <SkeletonLayout />
          ) : null}
        </main>
      </Layout>
    </>
  );
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
              onChange={(event) => props.setSearch(event.currentTarget.value)}
              type={"text"}
              minLength={1}
              maxLength={20}
              required
              className={`prose-sm w-full rounded-lg px-2 py-1 outline outline-purple-100 ring-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:outline-purple-200/40 dark:focus:ring-violet-700`}
              placeholder={"keyboard"}
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

export const Results = (props: {
  results: Dictionary | null;
  keyword: string;
}) => {
  const defaultSound = "/sounds/click-down.mp3";
  const [soundUrl, setSoundUrl] = useState("/sounds/click-down.mp3");
  const [playWord] = useSound(soundUrl, { volume: 0.25 });
  const refPlayIcon = useRef<HTMLButtonElement | null>(null);
  const refPhonetics = useRef<HTMLDivElement | null>(null);

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
                  <div
                    ref={refPhonetics}
                    className="relative inline-flex gap-x-2 rounded-lg transition-all  focus:animate-ping"
                  >
                    {dict.phonetics.map((x, index) => {
                      return (
                        <button
                          key={`phonetics-${index}`}
                          className={`${
                            x.audio.length > 0
                              ? "opacity-100"
                              : "pointer-events-none opacity-[65%] disabled:pointer-events-none"
                          }`}
                          onClick={() => {
                            setSoundUrl(x.audio);
                            if (refPlayIcon.current !== null) {
                              refPlayIcon.current.style.outline =
                                "2px solid purple";
                              setTimeout(() => {
                                if (refPlayIcon.current !== null) {
                                  refPlayIcon.current.style.outline =
                                    "0px solid transparent";
                                }
                              }, 1000);
                            }
                          }}
                        >
                          <a
                            href={x.audio}
                            onClick={(e) => e.preventDefault()}
                            className="prose-sm no-underline dark:text-violet-400"
                          >
                            {" "}
                            w{x.text}
                          </a>
                        </button>
                      );
                    })}{" "}
                  </div>
                ) : (
                  <span>n.a</span>
                )}
              </div>
            </div>
            <button
              ref={refPlayIcon}
              className="rounded-full stroke-purple-400 transition-all"
              onClick={(e) => {
                e.preventDefault();
                if (soundUrl !== defaultSound) {
                  playWord();
                } else {
                  if (refPhonetics.current !== null) {
                    refPhonetics.current.style.outline = "2px solid purple";
                    setTimeout(() => {
                      if (refPhonetics.current !== null) {
                        refPhonetics.current.style.outline = "0px solid purple";
                      }
                    }, 1000);
                  } else {
                    console.error(
                      "Something went wrong while getting word audio url"
                    );
                    // alert("Oops");
                  }
                }
              }}
            >
              <PlayIcon />
            </button>
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
                          {y.synonyms.length > 0 ? (
                            y.synonyms.map((z, idx) => (
                              <div key={`synonym-definition-${y}-${idx}`}>
                                {z}{" "}
                              </div>
                            ))
                          ) : (
                            <span className="sr-only">None</span>
                          )}
                        </div>

                        <div className="">
                          {y.antonyms.length > 0 ? (
                            y.antonyms.map((z, idx) => (
                              <div key={`antonyms-definition-${y}-${idx}`}>
                                {z}
                              </div>
                            ))
                          ) : (
                            <span className="sr-only">None</span>
                          )}
                        </div>

                        <blockquote className="opacity-70">
                          {y.example}
                        </blockquote>
                      </li>
                    ))}
                  </ul>

                  <div
                    key={`meaning-synonym-${meaning}-${index}`}
                    className="flex items-baseline"
                  >
                    {meaning.synonyms.length > 0 ? (
                      <>
                        <h3 className="prose-sm  opacity-50">Synonyms</h3>
                        <ul className="prose-sm flex list-none flex-wrap items-center gap-2">
                          {meaning.synonyms.map((synonym, idx) => (
                            <div key={`synonym-${synonym}-${idx}`}>
                              <a
                                href={`https://google.com/search?q=${synonym}`}
                              >
                                {synonym}
                              </a>
                            </div>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <span className="sr-only">None</span>
                    )}
                  </div>

                  <div
                    key={`meaning-antonym-${meaning}-${index}`}
                    className="flex items-baseline"
                  >
                    {meaning.antonyms.length > 0 ? (
                      <>
                        <h3
                          key={`heading-antonym-${meaning}`}
                          className="prose-sm  brightness-50"
                        >
                          Antonyms
                        </h3>

                        <ul className="prose-sm flex list-none flex-wrap items-center gap-2">
                          {meaning.antonyms.map((antonym, idx) => (
                            <div key={`${idx}-synonym-${antonym}-${idx}`}>
                              <a
                                href={`https://google.com/search?q=${antonym}`}
                              >
                                {antonym}
                              </a>
                            </div>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <span className="sr-only">None</span>
                    )}
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
