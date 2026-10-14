import { ReactNode } from "react";
import { transitLines } from "../data/transit-lines.ts";
import SectionSign from "./signage/section-sign-component.tsx";

function InfoRow({ jp, label, color, children }: { jp: string, label: string, color?: string, children: ReactNode }) {
    return (
        <div className="grid gap-2 border-t border-rule py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <div className="flex items-start gap-3">
                <span className="mt-1 h-10 w-1.5 shrink-0" style={{ backgroundColor: color ?? "var(--color-ink)" }} />
                <div className="leading-tight">
                    <p className="text-xs font-medium tracking-[0.2em] text-ink/50">{jp}</p>
                    <p className="text-lg font-bold">{label}</p>
                </div>
            </div>
            <p className="leading-relaxed text-ink/80">{children}</p>
        </div>
    );
}

// Proficiency drawn as a five-car train, filled cars for the current level.
// Spans only, since InfoRow renders its children inside a <p>.
function LanguageLevel({ name, level, note }: { name: string, level: number, note: string }) {
    return (
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 py-1">
            <span className="w-40 font-bold text-ink">{name}</span>
            <span className="flex gap-1" role="img" aria-label={`${level} out of 5`}>
                {[1, 2, 3, 4, 5].map(car => (
                    <span key={car}
                        className={`h-3 w-6 rounded-sm ${car <= level ? "bg-ink" : "border border-ink/25"}`} />
                ))}
            </span>
            <span className="text-sm text-ink/60">{note}</span>
        </span>
    );
}

export default function AboutMe() {
    return (
        <section id="about-me" className="scroll-mt-20 w-full px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <SectionSign jp="インフォメーション" en="About Me" glyph="i" />

                <div className="border-x border-b border-rule bg-white px-5 sm:px-8">
                    <InfoRow jp="現在地" label="Currently">
                        A British software engineer with a Computer Science background and professional experience
                        building high-performance C++ systems, currently based in <strong>Tokyo</strong>.
                    </InfoRow>

                    <InfoRow jp={transitLines.G.nameJp} label="Game Dev" color={transitLines.G.color}>
                        I've spent about a decade in <strong>Unreal Engine</strong> and <strong>C++</strong>, focusing
                        on core systems, C++ architecture, and multiplayer performance. Hands-on experience across
                        gameplay mechanics, UI UMG and Slate, client-server replication, AI (Behavior Trees, State
                        Trees, EQS), animation pipelines, and the Gameplay Ability System (GAS).
                    </InfoRow>

                    <InfoRow jp={transitLines.W.nameJp} label="Web Dev" color={transitLines.W.color}>
                        I'm branching out into <strong>full-stack</strong> and <strong>backend</strong> development:
                        data modeling, APIs, deployment, and keeping a live app running securely. I'm improving my
                        skills by building and shipping.
                    </InfoRow>

                    <InfoRow jp="言語" label="Languages">
                        <LanguageLevel name="English" level={5} note="Fluent" />
                        <LanguageLevel name="日本語 Japanese" level={2} note="Basic, currently learning!" />
                    </InfoRow>
                </div>
            </div>
        </section>
    );
}
