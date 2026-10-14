import { useEffect, useState } from "react";
import { projects } from "../data/projects-data.tsx";
import { getStation, transitLines } from "../data/transit-lines.ts";
import StationBadge from "./signage/station-badge-component.tsx";

const marqueeMessage = [
    "Open to new opportunities",
    "新しい機会を探しています",
    "Based in Tokyo 東京在住",
    "Backend | Full-stack | C++ | Unreal Engine | ",
];

const tokyoTimeFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
});

// Current Tokyo time for the departure board header, whatever the
// visitor's own timezone is.
function TokyoClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 10_000);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <time dateTime={now.toISOString()} className="text-led led-text">
            東京 {tokyoTimeFormat.format(now)} JST
        </time>
    );
}

export default function LandingPageHero() {
    return (
        <section id="home" className="w-full px-4 pt-28 pb-20 sm:pt-32">
            <div className="mx-auto max-w-5xl">

                {/* Station nameboard, modelled on the JR platform signs */}
                <div className="overflow-hidden border border-rule bg-white shadow-[0_2px_0_rgba(0,0,0,0.08)]">
                    <div className="relative flex flex-col items-center px-6 pt-10 pb-8 text-center">
                        <div className="mb-4 sm:mb-0 sm:absolute sm:top-6 sm:left-6">
                            <StationBadge code="MH01" color="#16181D" size="lg" />
                        </div>
                        <p className="text-3xl sm:text-6xl font-black tracking-wide">マット・ヘリテージ</p>
                        <h1 className="mt-2 text-lg sm:text-2xl font-bold tracking-[0.35em] text-ink/80">
                            MATT HERITAGE
                        </h1>
                        <p className="mt-4 max-w-xl text-sm sm:text-base text-ink/60">
                            Software engineer: high-performance C++ and Unreal Engine game systems, now
                            branching into full-stack web.
                        </p>
                    </div>

                    {/* Line band: the "previous / next station" strip, one half per line */}
                    <div className="grid grid-cols-2 text-white font-bold">
                        <a href="#projects" style={{ backgroundColor: transitLines.G.color }}
                            className="flex items-center gap-2 px-4 py-3 hover:brightness-110 transition">
                            <span aria-hidden="true">◀</span>
                            <span className="leading-tight">
                                <span className="block text-xs opacity-80">{transitLines.G.nameJp}</span>
                                {transitLines.G.name}
                            </span>
                        </a>
                        <a href="#projects" style={{ backgroundColor: transitLines.W.color }}
                            className="flex items-center justify-end gap-2 px-4 py-3 text-right hover:brightness-110 transition">
                            <span className="leading-tight">
                                <span className="block text-xs opacity-80">{transitLines.W.nameJp}</span>
                                {transitLines.W.name}
                            </span>
                            <span aria-hidden="true">▶</span>
                        </a>
                    </div>
                </div>

                {/* Departure board */}
                <div className="led-panel mt-8 border-4 border-sign font-dot">
                    <div
                        className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs sm:text-sm text-white/60">
                        <span>発車案内 <span className="ml-1">Departures</span></span>
                        <span className="flex items-center gap-4">
                            <TokyoClock />
                            <span className="hidden sm:inline text-led-green led-text">
                                <span className="led-blink">●</span> On time
                            </span>
                        </span>
                    </div>

                    <ul>
                        {projects.map(project => {
                            const station = getStation(project);
                            const status = project.liveLink ? "LIVE" : project.githubLink ? "GITHUB" : "—";
                            return (
                                <li key={project.id}>
                                    <a href={`#${station.code}`}
                                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 border-b border-white/5 px-4 py-2 hover:bg-white/5">
                                        <span className="w-12 px-1 py-0.5 text-center text-sm font-sans font-bold text-white"
                                            style={{ backgroundColor: station.line.color }}>{station.code}</span>
                                        <span className="truncate text-base sm:text-lg text-led led-text group-hover:text-white">
                                            {project.title}
                                        </span>
                                        <span
                                            className={`text-xs sm:text-sm led-text ${status === "LIVE" ? "text-led-green" : "text-led/70"}`}>
                                            {status}
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Scrolling ticker */}
                    <div className="overflow-hidden border-t border-white/10 py-2 text-sm text-led led-text"
                        aria-label={marqueeMessage.join(". ")}>
                        <div className="marquee-track" aria-hidden="true">
                            {[0, 1].map(copy => (
                                <span key={copy} className="flex shrink-0">
                                    {marqueeMessage.map(message => (
                                        <span key={message} className="px-6">■ {message}</span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
