import { Listbox, Disclosure, Menu, Transition } from "@headlessui/react";
import { MoonIcon, SearchIcon, SunIcon } from "@/components/icons";
import { ThemeToggler } from "./theme-toggler";
import { Fragment, useState } from 'react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
const navigation = [
  { name: "Home", href: "#", current: true },
  // { name: "Team", href: "#", current: false },
  { name: "Words", href: "/words", current: false },
  // { name: "Calendar", href: "#", current: false },
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
        <div className="flex gap-4 items-center navbar_end">
          <ToggleFont />
          <ToggleTheme />
        </div>
      </div>
    </>
  )
}
function Logo() {
  return (
    <div className="logo">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    </div>
  )
}

function ToggleTheme() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="grid place-self-center place-content-center pt-2">
      <Switch
        checked={enabled}
        title="toggle theme"
        onChange={setEnabled}
        className={`${enabled ? 'bg-violet-900' : 'bg-amber-600/90'}
          relative inline-flex items-center min-h-[19px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block aspect-square w-[1rem] transform rounded-full bg-neutral-100 shadow-lg ring-0 transition duration-200 ease-in-out`}
        >
        <div className="absolute backdrop-blur-sm z-10 transition-all grid place-content-center rounded-full inset-0">
          {enabled ? <MoonIcon className="h-3 w-3 text-purple-800 stroke-[3px]" /> : <SunIcon  className="h-3 w-3 text-amber-900 stroke-[3px]"  />}
        </div>
        </span>

      </Switch>
    </div>
  )
}

function ToggleFont() {
  const fontFamily = [
    { name: 'serif' },
    { name: 'sans-serif' },
  ]
  const [selected, setSelected] = useState(fontFamily[0])

  return (
    <div
      className="w-28 z-50"
    >
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
              backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {fontFamily.map((font, fontIdx) => (
                <Listbox.Option
                  key={fontIdx}
                  className={({ active }) =>
                    `relative cursor-default gap-2 items-center select-none py-2 px-2 disabled:pl-10 pr-4 
                    ${active ? 'dark:bg-purple-100/80 dark:text-purple-700' : 'dark:text-purple-300'
                    }`
                  }
                  value={font}
                >
                  {({ active }) => (
                    <>
                      <span
                        className={`truncate flex gap-2 capitalize ${active ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        <span className={`${selected.name === font.name ? 'opacity-100' : 'opacity-0'}`}><CheckIcon className="w-4 h-4" /></span>
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
  )
}

function CheckIcon(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${props.className} w-6 h-6`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function ChevronUpDownIcon(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${props.className} w-6 h-6`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
  )
}
