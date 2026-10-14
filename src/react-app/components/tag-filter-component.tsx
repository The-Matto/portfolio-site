import {ProjectTag} from "../data/projects-data.tsx";

export default function TagFilterComponent({tags, activeTags, onToggle, onClear}: {
    tags: ProjectTag[],
    activeTags: Set<ProjectTag>,
    onToggle: (tag: ProjectTag) => void,
    onClear: () => void,
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-bold">
                乗換 <span className="font-medium text-ink/60">Transfer</span>
            </span>
            {tags.map(tag => {
                const isActive = activeTags.has(tag);
                return (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => onToggle(tag)}
                        aria-pressed={isActive}
                        className={`cursor-pointer border px-3 py-1 text-sm font-medium transition-colors duration-150
                            ${isActive
                            ? "border-ink bg-ink text-white"
                            : "border-ink/25 bg-white text-ink/70 hover:border-ink hover:text-ink"}`}
                    >
                        {tag}
                    </button>
                );
            })}
            {activeTags.size > 0 && (
                <button
                    type="button"
                    onClick={onClear}
                    className="ml-1 cursor-pointer text-sm font-bold underline underline-offset-4 hover:text-line-g"
                >
                    Clear ✕
                </button>
            )}
        </div>
    );
}
