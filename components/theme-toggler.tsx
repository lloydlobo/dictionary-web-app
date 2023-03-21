import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ThemeToggler() {
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
    return null;
  }

  // e.target may select the svg or span too. e.currentTarget selects the parent button.
  const switchTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTheme(e.currentTarget.id);
    setDropdown(!dropdown);
  };

  const themeModes = [
    { name: "system", icon: <HomeIcon /> },
    { name: "light", icon: <GithubIcon /> },
    {
      name: "dark",
      icon: (
        <span className="-rotate-[25deg]">
          <WorkIcon />
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="relative">
        {/* Dropdown */}
        <div
          // className={`${dropdown ? "opacity-100" : "opacity-0 left-[200vw]" } top-8 z-10`}
          className={`${dropdown ? "block" : "hidden"}`}
        >
          <div className="divide-gray4/30 absolute right-0 top-8 grid max-h-[100px] divide-y rounded-md py-0.5 text-start backdrop-blur-sm">
            {themeModes.map(({ name, icon }, index) => (
              <button
                onClick={(e) => switchTheme(e)}
                id={name}
                aria-label={`Activate ${name} mode`}
                key={`theme-${name}-${index}`}
                disabled={disabled}
                className="dark:hover:bg-gray1/10 flex w-full cursor-pointer gap-x-2 divide-white px-2 py-2 text-center hover:bg-green-400 hover:backdrop-brightness-150 dark:bg-transparent dark:hover:backdrop-brightness-200"
              >
                <>
                  <div className="scale-100 brightness-75">{icon}</div>
                  <span className="text-xs brightness-90">{name}</span>
                </>
              </button>
            ))}
          </div>
        </div>

        {/* Current theme dock icon */}
        <div
        // className={ `${onHoverStyles} ${disabled ? "hidden" : "block"}`}
        >
          {themeModes.map(({ name, icon }, index) => {
            if (theme === name) {
              return (
                <button
                  key={`theme-${name}-${index}-curr-${theme}`}
                  disabled={disabled}
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                  className="flex items-center opacity-75"
                >
                  {icon}
                </button>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
}

const HomeIcon = () => {
  return (
    <Link
      href="/"
      // className={`${onHoverStyles} font-semibold underline underline-offset-8`}
      data-te-toggle="tooltip"
      data-te-placement="top"
      data-te-ripple-init
      data-te-ripple-color="light"
      title="Home"
    >
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
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    </Link>
  );
};
const WorkIcon = () => {
  return (
    <Link
      href="/work"
      // className={`${onHoverStyles} font-semibold underline underline-offset-8`}
      data-te-toggle="tooltip"
      data-te-placement="top"
      data-te-ripple-init
      data-te-ripple-color="light"
      title="Work"
    >
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
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
        />
      </svg>
    </Link>
  );
};
const GithubIcon = () => {
  return (
    <a
      href="https://github.com/lloydlobo/"
      // className={`${onHoverStyles} font-semibold underline underline-offset-8`}
      data-te-toggle="tooltip"
      data-te-placement="top"
      data-te-ripple-init
      data-te-ripple-color="light"
      title="Code"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
        ></path>
      </svg>
    </a>
  );
};
