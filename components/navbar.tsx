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
          <Logo />
        </div>
        <div className="navbar_end flex items-center gap-4">
          <ToggleFont />
          <ToggleThemeProvider>
          </ToggleThemeProvider>
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

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [dropdown, setDropdown] = useState(false);
  const { forcedTheme } = useTheme();
  // Theme is forced, we shouldn't allow user to change the theme
  const disabled = !!forcedTheme;

  useEffect(() => {
    // useEffect only runs on the client, so now we can safely show the UI
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>
    <div className="">
    <div className="grid place-content-center place-self-center pt-2">
      <Switch
      // A pseudo shell of `<ToggleTheme>` used only if not mounted for consistency.
        // checked={enabled}
        title="toggle theme"
        // onChange={setEnabled}
        className={`${false ? "bg-violet-900" : "bg-amber-600/90"} relative inline-flex min-h-[19px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${false ? "translate-x-4" : "translate-x-0"} pointer-events-none inline-block aspect-square w-[1rem] transform rounded-full bg-neutral-100 shadow-lg ring-0 transition duration-200 ease-in-out`}
        >
          <div className="absolute inset-0 z-10 grid place-content-center rounded-full backdrop-blur-sm transition-all">
            {false ? (
              <MoonIcon className="h-3 w-3 stroke-[3px] text-purple-800" />
            ) : (
              <SunIcon className="h-3 w-3 stroke-[3px] text-amber-900" />
            )}
          </div>
        </span>
      </Switch>
    </div>
    </div>
    </>;
  }

  // e.target may select the svg or span too. e.currentTarget selects the parent button.
  const switchTheme = (e: any) => {
    e.preventDefault();
    console.log(theme, e.currentTarget);
    let defaultTheme = e.currentTarget.id;
    setTheme(defaultTheme === theme ? 'light' : 'dark');
    console.log(theme, e.currentTarget);
    setDropdown(!dropdown);
  };

  return (<>
    <div id={`dark`} onClick={(e) => switchTheme(e)}>
            <ToggleTheme isNotDefault={theme === 'light'} />
    </div>
  </>);
}

function Logo() {
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

function ToggleTheme(props: { isNotDefault: boolean }) {
  const [enabled, setEnabled] = useState(props.isNotDefault);//false
  return (
    <div className="grid place-content-center place-self-center pt-2">
      <Switch
        checked={enabled}
        title="toggle theme"
        onChange={setEnabled}
        className={`${enabled ? "bg-violet-900" : "bg-amber-600/90"}
          relative inline-flex min-h-[19px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block aspect-square w-[1rem] transform rounded-full bg-neutral-100 shadow-lg ring-0 transition duration-200 ease-in-out`}
        >
          <div className="absolute inset-0 z-10 grid place-content-center rounded-full backdrop-blur-sm transition-all">
            {enabled ? (
              <MoonIcon className="h-3 w-3 stroke-[3px] text-purple-800" />
            ) : (
              <SunIcon className="h-3 w-3 stroke-[3px] text-amber-900" />
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

  return (
    <div className="z-50 w-28">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            title="toggle font family"
            className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-end shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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
