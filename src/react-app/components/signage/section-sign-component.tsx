// Hanging station sign used as a section heading: a pictogram tile, the
// Japanese label above the English one, and an optional direction arrow.
export default function SectionSign({jp, en, glyph, accent, arrow}: {
    jp: string,
    en: string,
    glyph: string,
    accent?: string,
    arrow?: string
}) {
    return (
        <div className="flex items-stretch bg-sign text-white">
            <div className="w-2 shrink-0" style={{backgroundColor: accent ?? "transparent"}}/>
            <div className="flex items-center gap-4 px-4 py-3 sm:px-5">
                <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white text-2xl font-black text-sign">
                    {glyph}
                </span>
                <div className="leading-tight">
                    <p className="text-sm font-bold tracking-[0.2em] text-white/70">{jp}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold">{en}</h2>
                </div>
            </div>
            {arrow && (
                <span className="ml-auto flex items-center px-5 text-3xl font-black text-white/80"
                      aria-hidden="true">{arrow}</span>
            )}
        </div>
    );
}
