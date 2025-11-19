import { useState, useEffect } from "react";

const MENU_ITEMS = [
    { id: " 1", name: "Home", href: "/" },
    {
        id: "2",
        name: "Dropdown",
        children: [
            { id: "21", name: "Dashboard", href: "/dashboard" },
            { id: "22", name: "Settings", href: "/settings" },
            { id: "23", name: "Earnings", href: "/earnings" },
            { id: "24", name: "Sign out", href: "/logout" },
        ],
    },
    { id: "3", name: "Services", href: "/services" },
    { id: "4", name: "Pricing", href: "/pricing" },
    { id: "5", name: "Contact", href: "/contact" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string>('');
    const [scrolled, setScrolled] = useState(false);

    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? '' : id);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed inset-x-0 z-20 top-0 left-0 border-b transition-colors duration-300 
      ${scrolled ? "my-4 mx-2 rounded-xl" : ""}
      ${scrolled || isMenuOpen ? "bg-white text-black shadow-md" : "bg-neutral-primary text-white"}
  `}
        >
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

                {/* Left Section */}
                <div className="flex items-center gap-4">

                    {/* Hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 w-10 h-10 flex items-center justify-center rounded hover:bg-neutral-secondary-soft z-50 "
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke={scrolled ? "black" : "white"} strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
                            </svg>
                        )}
                    </button>

                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-2">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Logo" />
                        <span className="text-xl font-semibold">Flowbite</span>
                    </a>
                </div>

                {/* MENU LIST */}
                <div className={`
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static top-0 left-0  h-screen md:h-auto  w-64 md:w-auto 
         bg-white md:bg-transparent text-white md:text-current p-6 md:p-0  transition-all duration-300 mt-18 md:mt-0`}
                >
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 ">

                        {MENU_ITEMS.map((item) => (
                            <li key={item.id} className="relative">

                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            className="flex items-center justify-between w-full px-3 py-2 hover:text-fg-brand text-current"
                                        >
                                            {item.name}
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {openDropdown === item.id && (
                                            <div className="absolute left-0 mt-2 w-44 bg-white text-black border rounded shadow-lg z-50">
                                                <ul className="p-2 text-sm">
                                                    {item.children.map((child) => (
                                                        <li key={child.id}>
                                                            <a
                                                                href={child.href}
                                                                className="block px-3 py-2 hover:bg-neutral-secondary-soft rounded"
                                                            >
                                                                {child.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="block px-3 py-2 hover:text-fg-brand text-current"
                                    >
                                        {item.name}
                                    </a>
                                )}

                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
