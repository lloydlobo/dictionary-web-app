import { Listbox, Disclosure, Menu, Transition } from "@headlessui/react";
import { MoonIcon, SearchIcon, SunIcon } from "@/components/icons";
import { useEffect, Fragment, ReactNode, useState } from "react";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Words", href: "/words", current: false },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  return (
    <>
      <div className="navbar flex items-center">
        <div className="navbar_start flex-1">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar_end flex items-center gap-4">
          <ToggleFont />
          <ToggleThemeProvider />
        </div>
      </div>
    </>
  );
}

type ToggleThemeProviderProps = {
  children?: ReactNode;
  title?: string;
};

function ToggleThemeProvider({
  children,
  title = "Toggle theme",
}: ToggleThemeProviderProps) {
  const pseudoLoadingEnabled = true;

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { forcedTheme } = useTheme();

  // Theme is forced, we shouldn't allow user to change the theme
  const disabled = !!forcedTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  // e.target may select the svg or span too. e.currentTarget selects the parent button.
  const switchTheme = (e: any) => {
    e.preventDefault();
    let defaultTheme = e.currentTarget.id;
    setTheme(defaultTheme === theme ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <>
        <div className="grid place-content-center place-self-center pt-2">
          <Switch // A pseudo shell of `<ToggleTheme>` used only if not mounted for consistency.
            title="toggle theme"
            disabled
            className={`${pseudoLoadingEnabled ? "bg-violet-900" : "bg-amber-600/90"
              } relative inline-flex min-h-[19px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Toggle Theme</span>
            <span
              aria-hidden="true"
              className={`${pseudoLoadingEnabled ? "translate-x-[1.1rem]" : "translate-x-0"
                }
            pointer-events-none inline-block aspect-square w-[0.9rem] transform rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out`}
            >
              <div className="absolute inset-0 z-10 grid place-content-center rounded-full backdrop-blur-[2px] transition-all">
                {pseudoLoadingEnabled ? (
                  <MoonIcon className="aspect-square w-[0.85rem] fill-violet-600 stroke-[1px] text-violet-800" />
                ) : (
                  <SunIcon className="aspect-square w-[0.9rem] fill-amber-600  stroke-[2px] text-amber-800" />
                )}
              </div>
            </span>
          </Switch>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          id={`dark`}
          onClick={(e) => switchTheme(e)}
          className={`${disabled ? "hidden" : "block"}`}
        >
          <ToggleTheme enabled={theme === "dark"} />
        </div>
      </>
    );
  }
}

export function Logo() {
  return (
    <div className="logo">
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
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
    </div>
  );
}

function ToggleTheme(props: { enabled: boolean }) {
  // const [enabled, setEnabled] = useState(props.isNotDefault); //false
  return (
    <div className="grid place-content-center place-self-center pt-2">
      <Switch
        // checked={enabled}
        // onChange={setEnabled}
        // onChange={props.isNotDefault}
        // className={`${enabled ? "bg-violet-900" : "bg-amber-500/90"}
        checked={props.enabled}
        title="toggle theme"
        className={`${props.enabled ? "bg-violet-900" : "bg-amber-500/90"}
          relative inline-flex min-h-[19px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Toggle Theme</span>
        <span
          aria-hidden="true"
          className={`${props.enabled ? "translate-x-[1.1rem]" : "translate-x-0"
            }
            pointer-events-none inline-block aspect-square w-[0.9rem] transform rounded-full bg-white ring-0 transition-all duration-200 ease-in-out`}
        >
          <div className="absolute inset-0 z-10 grid place-content-center rounded-full backdrop-blur-[2px] transition-all">
            {props.enabled ? (
              <MoonIcon className="aspect-square w-[0.85rem] fill-violet-600 stroke-[1px] text-violet-800" />
            ) : (
              <SunIcon className="aspect-square w-[0.9rem] fill-amber-600  stroke-[2px] text-amber-800" />
            )}
          </div>
        </span>
      </Switch>
    </div>
  );
}

function ToggleFont() {
  const fontFamily = [{ name: "serif" }, { name: "sans-serif" }];
  const [selected, setSelected] = useState(fontFamily[0]);
  const UseSetFontFamily = (e: any) => {
    const val = e.name;
    setSelected(e);
    if (val !== null) {
      // document.documentElement.style.setProperty('--font-color', '#bada56');
      document.documentElement.style.setProperty('--font-family', `${val}`);
      // document.documentElement.style.setProperty('--font-family', `${val} !important`);
    }

    // useEffect(() => {
    //   e.preventDefault();
    //   console.log(e.currentTarget.value);
    //   document.documentElement.style.setProperty('--font-color', '#bada56');
    //   document.documentElement.style.setProperty('--font-family', selected.name);
    //   return () => {
    //   }
    // }, [])
  }

  return (
    <div className="z-50 w-28">
      <Listbox value={selected} onChange={(e) => UseSetFontFamily(e)}>
        <div className="relative mt-1">
          <Listbox.Button
            title="toggle font family"
            className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-end focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate capitalize">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
              py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-xl focus:outline-none sm:text-sm"
            >
              {fontFamily.map((font, fontIdx) => (
                <Listbox.Option
                  key={fontIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none items-center gap-2 py-2 px-2 pr-4 disabled:pl-10 
                    ${active
                      ? "dark:bg-purple-100/80 dark:text-purple-700"
                      : "dark:text-purple-300"
                    }`
                  }
                  value={font}
                >
                  {({ active }) => (
                    <>
                      <span
                        className={`flex gap-2 truncate capitalize ${active ? "font-medium" : "font-normal"
                          }`}
                      >
                        <span
                          className={`${selected.name === font.name
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        {font.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function CheckIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${props.className} h-6 w-6`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function ChevronUpDownIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${props.className} h-6 w-6`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  );
}
