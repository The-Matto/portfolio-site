// Tokyo-style station number badge: a rounded square bordered in the line
// colour, with the line letter stacked over the station number.
const sizes = {
    sm: {box: "size-9 border-[3px] rounded-md", letter: "text-[9px]", number: "text-sm"},
    md: {box: "size-12 border-4 rounded-lg", letter: "text-[11px]", number: "text-lg"},
    lg: {box: "size-16 sm:size-20 border-[5px] sm:border-[6px] rounded-xl", letter: "text-xs sm:text-sm", number: "text-2xl sm:text-3xl"},
};

export default function StationBadge({code, color, size = "md"}: {
    code: string,
    color: string,
    size?: keyof typeof sizes
}) {
    const [, letters, number] = code.match(/^([A-Z]+)(\d+)$/) ?? [code, code, ""];
    const classes = sizes[size];

    return (
        <span
            className={`${classes.box} inline-flex shrink-0 flex-col items-center justify-center bg-white font-bold leading-none text-ink`}
            style={{borderColor: color}}>
            <span className={classes.letter}>{letters}</span>
            <span className={`${classes.number} tracking-tight`}>{number}</span>
        </span>
    );
}
