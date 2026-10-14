export default function NavLink({path, text, jp, onClickFunc, renderAsBlock}: {
    path: string,
    text: string,
    jp?: string,
    onClickFunc?: () => void,
    renderAsBlock?: boolean
}) {

    const classes = `group relative px-3 py-2 leading-tight text-white`;
    return (
        <a
            href={path}
            className={`${classes} ${renderAsBlock ? "block" : ""}`}
            onClick={onClickFunc}
        >
            {jp && <span className="block text-[10px] font-medium tracking-[0.2em] text-white/50">{jp}</span>}
            <span className="font-bold">{text}</span>
            <span
                className="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 bg-line-g transition-transform duration-150 group-hover:scale-x-100"/>
        </a>
    )
}
