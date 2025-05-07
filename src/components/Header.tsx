import Link from "next/link";

const Header = () => {
  return (
    <nav className="rounded-lg overflow-hidden p-2 bg-kino-darkred mx-auto w-full max-w-screen-xl">
      <div className="flex justify-center items-center gap-4">
        <Link
          href="/"
          className="text-sm text-current ml-2 mr-2 block py-1 font-semibold"
        >
          Kino
        </Link>
        <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
        <div className="hidden lg:block">
          <ul className="flex gap-6">
            <li>
              <Link
                href="#"
                className="text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
              >
                Current Movies
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
              >
                Blocks
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
              >
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <button className="items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block">
          Sign In
        </button>

        <div
          data-dui-toggle="collapse"
          data-dui-target="#navbarCollapse"
          aria-expanded="false"
          aria-controls="navbarCollapse"
          className="place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none ml-auto grid lg:hidden cursor-pointer"
        >
          <svg
            width="1.5em"
            height="1.5em"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className="h-4 w-4"
          >
            <path
              d="M3 5H21"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 12H21"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>

      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out max-h-0 lg:hidden"
        id="navbarCollapse"
      >
        <ul className="flex flex-col gap-y-1.5 mt-4">
          <li>
            <Link
              href="#"
              className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
            >
              Pages
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
            >
              Account
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
            >
              Blocks
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
            >
              Docs
            </Link>
          </li>
          <li className="mt-2">
            <button className="w-full items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
              Sign In
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
