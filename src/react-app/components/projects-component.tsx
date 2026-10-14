import {Project, ProjectTag, projects} from "../data/projects-data.tsx";
import {getStation, transitLines} from "../data/transit-lines.ts";
import ProjectComponent from "./project-component.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import ProjectSummaryComponent from "./project-summary-component.tsx";
import TagFilterComponent from "./tag-filter-component.tsx";
import SectionSign from "./signage/section-sign-component.tsx";

export default function Projects() {

    const [activeProject, setActiveProject] = useState<Project>(projects[0]);
    const [activeTags, setActiveTags] = useState<Set<ProjectTag>>(new Set());
    const detailRef = useRef<HTMLDivElement>(null);

    // Rows on the hero's departure board link to #G01 etc, so following one
    // selects that station here as well as scrolling to it.
    useEffect(() => {
        const selectFromHash = () => {
            const code = window.location.hash.slice(1);
            const match = projects.find(project => getStation(project).code === code);
            if (match) {
                setActiveProject(match);
            }
        };
        selectFromHash();
        window.addEventListener("hashchange", selectFromHash);
        return () => window.removeEventListener("hashchange", selectFromHash);
    }, []);

    const allTags = useMemo(() => {
        const seen = new Set<ProjectTag>();
        projects.forEach(project => project.tags.forEach(tag => seen.add(tag)));
        return Array.from(seen);
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeTags.size === 0) return projects;
        return projects.filter(project => project.tags.some(tag => activeTags.has(tag)));
    }, [activeTags]);

    // Each line gets its own route map, and a line with no stations left
    // after filtering is hidden rather than drawn empty.
    const lineGroups = useMemo(() => [transitLines.W, transitLines.G]
        .map(line => ({line, stations: filteredProjects.filter(project => getStation(project).line.id === line.id)}))
        .filter(group => group.stations.length > 0), [filteredProjects]);

    const toggleTag = (tag: ProjectTag) => {
        setActiveTags(prev => {
            const next = new Set(prev);
            if (next.has(tag)) {
                next.delete(tag);
            } else {
                next.add(tag);
            }
            return next;
        });
    };

    const clickHandler = (selectedProject: Project) => {
        setActiveProject(selectedProject);
        // Below lg the detail panel sits under the route map, so bring it
        // into view or the tap looks like it did nothing.
        if (!window.matchMedia("(min-width: 1024px)").matches) {
            detailRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }

    return (
        <section id="projects" className="scroll-mt-20 w-full px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <SectionSign jp="発車案内" en="Projects" glyph="→" arrow="→" accent={transitLines.G.color}/>

                <div className="mt-6 flex flex-col gap-6">
                    <TagFilterComponent tags={allTags} activeTags={activeTags} onToggle={toggleTag}
                                         onClear={() => setActiveTags(new Set())}/>

                    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">

                        {/* Route map */}
                        <div className="lg:w-5/12">
                            {filteredProjects.length === 0 ? (
                                <p className="border border-dashed border-ink/30 py-12 text-center text-ink/50">
                                    No stations on this route. 該当なし
                                </p>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    {lineGroups.map(({line, stations}) => (
                                        <div key={line.id}>
                                            {/* Line name plate */}
                                            <div className="mb-2 flex items-center gap-3 px-2">
                                                <span
                                                    className="flex size-7 items-center justify-center rounded-full text-sm font-black text-white"
                                                    style={{backgroundColor: line.color}}>{line.id}</span>
                                                <p className="font-bold leading-tight">
                                                    {line.name} Line
                                                    <span className="ml-2 text-xs font-medium text-ink/50">{line.nameJp}線</span>
                                                </p>
                                                <span className="h-1 flex-1" style={{backgroundColor: line.color}}/>
                                            </div>
                                            <ol>
                                                {stations.map((project, index) => (
                                                    <ProjectComponent key={project.id} project={project}
                                                                      onClick={clickHandler}
                                                                      isActive={project.id === activeProject.id}
                                                                      isFirst={index === 0}
                                                                      isLast={index === stations.length - 1}/>
                                                ))}
                                            </ol>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Station detail */}
                        <div ref={detailRef} className="scroll-mt-20 lg:w-7/12 lg:sticky lg:top-24">
                            <ProjectSummaryComponent project={activeProject}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
