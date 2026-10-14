import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Project} from "../data/projects-data.tsx";
import ProjectImageCarousel from "./project-image-carousel-component.tsx";
import {ProjectLinks, StationHeader} from "./project-summary-component.tsx";
import TagChip from "./signage/tag-chip-component.tsx";

export default function ProjectModal({project, open, onClose}: {
    project: Project,
    open: boolean,
    onClose: () => void
}) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            {/* Backdrop fade */}
            <div
                className="fixed inset-0 bg-ink/70 transition duration-300 data-[closed]:opacity-0"
                aria-hidden="true"/>

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white text-ink transition duration-300 data-[closed]:opacity-0 data-[closed]:scale-95">
                    <DialogTitle className="sr-only">{project.title}</DialogTitle>
                    <StationHeader project={project}/>
                    <button type="button" onClick={onClose} aria-label="Close"
                            className="absolute top-3 right-3 cursor-pointer p-1.5 text-white hover:bg-white/20 transition-colors duration-150">
                        <XMarkIcon className="size-6"/>
                    </button>

                    <ProjectImageCarousel project={project} className="h-64 sm:h-80"/>

                    <div className="p-5 space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map(tag => <TagChip key={tag} text={tag}/>)}
                        </div>
                        <p className="whitespace-pre-line leading-relaxed text-ink/80">{project.description}</p>
                        <ProjectLinks project={project}/>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
