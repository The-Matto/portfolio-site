import {useState} from "react";

import {
    Dialog,
    DialogPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import NavLink from "./nav-clickable-link.tsx";
import SocialLinksNav from "./social-links-nav-component.tsx";

export default function NavBar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="">

            <nav aria-label="Global"
                 className="fixed top-0 z-40 mx-auto flex w-full items-center justify-between bg-sign px-4 py-2 lg:px-8 border-b-4 border-line-g">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Matt Heritage</span>
                        <img
                            alt="logo"
                            src="/MattLogo.png"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>

                <div className="hidden lg:flex lg:items-center lg:gap-6 text-white">
                    <NavLink path={"/#projects"} jp={"発車案内"} text={"Projects"}/>
                    <NavLink path={"/#about-me"} jp={"案内"} text={"About Me"}/>
                    <NavLink path={"/#contact"} jp={"出口"} text={"Contact"}/>
                    <div className="flex items-center gap-3 pl-6 border-l border-white/15">
                        <SocialLinksNav/>
                    </div>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center p-2.5 text-white/70"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6"/>
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end"/>

            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-sign p-6 sm:max-w-sm border-l-4 border-line-g">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <img
                                alt=""
                                src="/MattLogo.png"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 p-2.5 text-white/70"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10 block">
                            <div className="space-y-2 py-6 block">
                                <NavLink path={"/#projects"} onClickFunc={closeMobileMenu} renderAsBlock={true}
                                         jp={"発車案内"} text={"Projects"}/>
                                <NavLink path={"/#about-me"} onClickFunc={closeMobileMenu} renderAsBlock={true}
                                         jp={"案内"} text={"About Me"}/>
                                <NavLink path={"/#contact"} onClickFunc={closeMobileMenu} renderAsBlock={true}
                                         jp={"出口"} text={"Contact"}/>

                            </div>
                            <div className="py-6 flex flex-col gap-3">
                                <SocialLinksNav/>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}