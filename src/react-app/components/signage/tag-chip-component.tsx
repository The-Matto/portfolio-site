export default function TagChip({text}: { text: string }) {
    return (
        <span className="inline-block border border-ink/25 bg-white px-2 py-0.5 text-xs font-medium text-ink/80">
            {text}
        </span>
    );
}
