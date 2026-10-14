import "../App.css";

import NavBar from "./navbar-component.jsx.tsx";
import Footer from "./footer-component.tsx";
import LandingPageHero from "./landing-page-hero-component.tsx";
import Projects from "./projects-component.tsx";
import AboutMe from "./about-me-component.tsx";
import Contact from "./contact-component.tsx";
import PlatformBackground from "./platform-background-component.tsx";

export default function Layout() {
    return (
        <>
            <PlatformBackground/>

            <NavBar/>

            <LandingPageHero/>

            <Projects/>

            <AboutMe/>

            <Contact/>

            <Footer/>
        </>
    )
}
