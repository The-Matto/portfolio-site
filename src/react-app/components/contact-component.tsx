import {useEffect, useState} from "react";
import {CheckIcon, ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import {socialLinks} from "../data/social-links-data.ts";

const labelsJp: Record<string, string> = {
    email: "メール",
    github: "ギットハブ",
    linkedin: "リンクトイン",
};

// Sits beside the email exit rather than inside it, since a button can't be
// nested in a link. Handy for visitors without a mail client set up.
function CopyButton({value}: { value: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 2000);
        return () => window.clearTimeout(timer);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
        } catch {
            // Clipboard can be blocked (permissions, insecure context); the
            // address is still visible and the mailto link still works.
        }
    };

    return (
        <button type="button" onClick={copy}
                className="flex w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-0.5 border-l-2 border-ink/15 text-xs font-bold hover:bg-ink hover:text-exit transition-colors duration-150">
            {copied ? <CheckIcon className="size-5"/> : <ClipboardDocumentIcon className="size-5"/>}
            <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
        </button>
    );
}

// Styled as the yellow exit signage found in every Tokyo station, with each
// contact method as a numbered exit.
export default function Contact() {
    return (
        <section id="contact" className="scroll-mt-20 w-full px-4 py-16">
            <div className="max-w-5xl mx-auto bg-exit text-ink">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-1 border-b-4 border-ink px-5 py-5 sm:px-8">
                    <span className="text-5xl sm:text-6xl font-black leading-none">出口</span>
                    <h2 className="text-3xl sm:text-4xl font-black leading-none">Exit</h2>
                    <p className="w-full sm:w-auto sm:ml-auto font-bold">Get in touch / お問い合わせ</p>
                </div>

                <ul>
                    {socialLinks.map((link, index) => (
                        <li key={link.id} className="flex border-b-2 border-ink/15 last:border-b-0">
                            <a href={link.href}
                               target={link.id === "email" ? undefined : "_blank"}
                               rel={link.id === "email" ? undefined : "noreferrer"}
                               className="group flex min-w-0 flex-1 items-center gap-4 px-5 py-4 sm:px-8 hover:bg-ink hover:text-exit transition-colors duration-150">
                                <span
                                    className="flex h-10 w-12 shrink-0 items-center justify-center bg-ink text-lg font-black text-exit group-hover:bg-exit group-hover:text-ink">
                                    A{index + 1}
                                </span>
                                <span className="w-28 shrink-0 leading-tight">
                                    <span className="block text-[11px] font-medium opacity-60">{labelsJp[link.id]}</span>
                                    <span className="font-bold">{link.label}</span>
                                </span>
                                <span className="min-w-0 flex-1 truncate font-medium">{link.value}</span>
                                <span className="text-2xl font-black transition-transform duration-150 group-hover:translate-x-1"
                                      aria-hidden="true">→</span>
                            </a>
                            {link.id === "email" && <CopyButton value={link.value}/>}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
