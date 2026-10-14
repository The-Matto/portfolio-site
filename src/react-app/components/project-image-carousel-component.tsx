import {getMediaThumbnailSrc, Project} from "../data/projects-data.tsx";
import {getStation} from "../data/transit-lines.ts";
import {useEffect, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import {PlayCircleIcon} from "@heroicons/react/24/solid";

// Shared by the summary panel and the project modal so both get the same
// carousel behaviour without duplicating the logic. Handles images and
// YouTube videos as slides in the same carousel.
export default function ProjectImageCarousel({project, className}: { project: Project, className?: string }) {

    const [activeIndex, setActiveIndex] = useState(0);
    // A video slide shows a click-to-play thumbnail first, rather than
    // embedding (and loading) the YouTube player before it's wanted.
    const [isPlaying, setIsPlaying] = useState(false);

    const media = project.media ?? [];
    const mediaCount = media.length;
    const hasMedia = mediaCount > 0;
    const activeMedia = media[activeIndex];
    const station = getStation(project);

    useEffect(() => {
        setActiveIndex(0);
        setIsPlaying(false);
    }, [project]);

    const goToIndex = (index: number) => {
        setActiveIndex(index);
        setIsPlaying(false);
    };

    const changeSlide = (increment: boolean) => {
        if (mediaCount === 0) return;
        // +mediaCount before the modulo so a "previous" from index 0 wraps to
        // the last slide instead of going negative.
        setActiveIndex(prev => (prev + (increment ? 1 : -1) + mediaCount) % mediaCount);
        setIsPlaying(false);
    };

    return (
        <div className={`relative w-full overflow-hidden bg-ink ${className ?? "h-56 sm:h-64"}`}>
            {!hasMedia ? (
                // No screenshot yet: show the station code large, like a platform number sign.
                <div className="flex h-full w-full items-center justify-center bg-sign">
                    <span className="select-none text-8xl font-black tracking-tight"
                          style={{color: station.line.color}}>{station.code}</span>
                </div>
            ) : activeMedia.type === "image" ? (
                <img className="w-full h-full object-cover"
                     src={activeMedia.src}
                     alt={`${project.title} screenshot ${activeIndex + 1} of ${mediaCount}`}/>
            ) : isPlaying ? (
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeMedia.videoId}?autoplay=1`}
                    title={`${project.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
            ) : (
                <button type="button" onClick={() => setIsPlaying(true)} aria-label="Play video"
                        className="group relative block w-full h-full cursor-pointer">
                    <img className="w-full h-full object-cover"
                         src={getMediaThumbnailSrc(activeMedia)}
                         alt={`${project.title} video thumbnail`}/>
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-150">
                        <PlayCircleIcon className="size-16 text-white drop-shadow-lg"/>
                    </div>
                </button>
            )}

            {/* Carousel controls, only shown when there's more than one slide */}
            {mediaCount > 1 && (
                <>
                    <button type="button" onClick={() => changeSlide(false)} aria-label="Previous slide"
                            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 flex size-8 items-center justify-center bg-ink/80 text-white hover:bg-line-g transition-colors duration-150 cursor-pointer">
                        <ChevronLeftIcon className="size-5"/>
                    </button>
                    <button type="button" onClick={() => changeSlide(true)} aria-label="Next slide"
                            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 flex size-8 items-center justify-center bg-ink/80 text-white hover:bg-line-g transition-colors duration-150 cursor-pointer">
                        <ChevronRightIcon className="size-5"/>
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                        {media.map((_, index) => (
                            <button key={index} type="button" onClick={() => goToIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-1.5 w-5 transition-colors duration-150 cursor-pointer ${
                                        index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                                    }`}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
