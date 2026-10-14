import {EnvelopeIcon} from "@heroicons/react/24/outline";
import {GitHubIcon, LinkedInIcon} from "./social-icons-component.tsx";
import {socialLinks} from "../data/social-links-data.ts";
import {ComponentType} from "react";

const icons: Record<string, ComponentType<{ className?: string }>> = {
    email: EnvelopeIcon,
    github: GitHubIcon,
    linkedin: LinkedInIcon,
};

export default function SocialLinksNav({className}: { className?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className ?? ""}`}>
            {socialLinks.map(link => {
                const Icon = icons[link.id];
                return (
                    <a key={link.id} href={link.href}
                       target={link.id === "email" ? undefined : "_blank"}
                       rel={link.id === "email" ? undefined : "noreferrer"}
                       aria-label={link.label}
                       className="text-white/60 hover:text-line-g transition-colors duration-150">
                        <Icon className="size-5"/>
                    </a>
                );
            })}
        </div>
    );
}
