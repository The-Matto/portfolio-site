import {Project} from "../data/projects-data.tsx";
import {getStation} from "../data/transit-lines.ts";
import StationBadge from "./signage/station-badge-component.tsx";

// One stop on the vertical route map. The line segments above and below the
// badge take this station's line colour, so the route visibly changes colour
// where it switches between the Game and Web lines.
export default function ProjectComponent({project, onClick, isActive, isFirst, isLast}: {
    project: Project,
    onClick: (selectedProject: Project) => void,
    isActive: boolean,
    isFirst: boolean,
    isLast: boolean
}) {

    const station = getStation(project);

    return (
        <li id={station.code} className="relative isolate scroll-mt-28">
            <span className={`pointer-events-none absolute left-[34px] z-10 w-2 ${isFirst ? "top-1/2" : "top-0"} ${isLast ? "bottom-1/2" : "bottom-0"}`}
                  style={{backgroundColor: station.line.color}} aria-hidden="true"/>

            <button type="button" onClick={() => onClick(project)} aria-pressed={isActive}
                    className={`relative flex w-full cursor-pointer items-center gap-4 px-2 py-3 text-left transition-colors duration-150
                        ${isActive ? "bg-white shadow-[inset_4px_0_0_var(--color-ink)]" : "hover:bg-white/60"}`}>
                <span className="relative z-20 pl-1.5">
                    <StationBadge code={station.code} color={station.line.color} size="md"/>
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium tracking-[0.15em] text-ink/50">
                        {station.line.nameJp} · {station.line.name} Line
                    </span>
                    <span className="block truncate text-lg font-bold">{project.title}</span>
                </span>
                {isActive && (
                    <span className="hidden sm:block shrink-0 bg-ink px-2 py-1 text-[11px] font-bold leading-tight text-white text-center">
                        現在地<br/><span className="font-medium text-white/70">You are here</span>
                    </span>
                )}
            </button>
        </li>
    );
}
