export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-8 w-full">
            <div className="platform-edge h-3" aria-hidden="true"/>
            <div
                className="flex flex-col items-center justify-between gap-2 bg-ink px-4 py-6 text-sm text-white/50 sm:flex-row">
                <span>
                    <span className="font-bold text-white">Please mind the gap.</span> 足元にご注意ください
                </span>
                <span>Matt Heritage © {year} · built with React + Cloudflare</span>
            </div>
        </footer>
    );
}
