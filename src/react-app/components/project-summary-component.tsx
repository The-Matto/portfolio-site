import {Project} from "../data/projects-data.tsx";
import {getStation} from "../data/transit-lines.ts";
import {useEffect, useRef, useState} from "react";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import ProjectImageCarousel from "./project-image-carousel-component.tsx";
import ProjectModal from "./project-modal-component.tsx";
import StationBadge from "./signage/station-badge-component.tsx";
import TagChip from "./signage/tag-chip-component.tsx";

// Line-coloured header strip with the station badge, shared with the modal.
export function StationHeader({project}: { project: Project }) {
    const station = getStation(project);
    return (
        <div className="flex items-center gap-3 px-4 py-3 text-white" style={{backgroundColor: station.line.color}}>
            <StationBadge code={station.code} color={station.line.color} size="md"/>
            <div className="min-w-0 leading-tight">
                <p className="text-xs font-medium tracking-[0.15em] opacity-85">
                    {station.line.nameJp} · {station.line.name} Line
                </p>
                <h3 className="text-xl sm:text-2xl font-bold">{project.title}</h3>
            </div>
        </div>
    );
}

export function ProjectLinks({project}: { project: Project }) {
    if (!project.liveLink && !project.githubLink) return null;
    return (
        <div className="flex flex-wrap items-center gap-3">
            {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-line-g transition-colors duration-150">
                    <ArrowTopRightOnSquareIcon className="size-4"/>
                    Visit live
                </a>
            )}
            {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-1.5 border border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-white transition-colors duration-150">
                    GitHub →
                </a>
            )}
        </div>
    );
}

export default function ProjectSummaryComponent({project}: { project: Project }) {

    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Line-clamp is CSS-only, so we measure the actual DOM node to know
    // whether it's genuinely cutting text off, re-checking on resize since
    // the panel's width (and therefore how much fits in 4 lines) can change.
    useEffect(() => {
        const measure = () => {
            const el = descriptionRef.current;
            if (el) {
                setIsTruncated(el.scrollHeight > el.clientHeight + 1);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [project]);

    return (
        <div className="border border-rule bg-white">
            <StationHeader project={project}/>
            <ProjectImageCarousel project={project}/>

            <div className="p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => <TagChip key={tag} text={tag}/>)}
                </div>

                <div>
                    <p ref={descriptionRef} className="line-clamp-4 whitespace-pre-line leading-relaxed text-ink/80">{project.description}</p>
                    {isTruncated && (
                        <button type="button" onClick={() => setIsModalOpen(true)}
                                className="mt-1 cursor-pointer text-sm font-bold underline underline-offset-4 hover:text-line-g">
                            Read more 詳細
                        </button>
                    )}
                </div>

                <ProjectLinks project={project}/>
            </div>

            <ProjectModal project={project} open={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    )
}
