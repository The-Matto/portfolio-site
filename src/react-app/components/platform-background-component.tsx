import {useEffect, useState} from "react";

// Faint metro-map linework behind the whole page: off-white routes with
// 45-degree bends and station rings, fixed so the content scrolls over it.
// The tones sit just either side of the platform colour so it reads as
// texture rather than competing with the actual signage.
const shade = "var(--color-platform-shade)";
const light = "var(--color-platform-light)";

// Every route that carries a train starts and ends well outside the viewBox
// (further than a train is long), so a train looping back from one end to
// the other is never seen.
const routes = [
    {id: "route-a", d: "M -120 180 H 360 L 520 340 V 620 L 700 800 H 1560", stroke: shade, width: 26},
    {id: "route-b", d: "M 1560 120 H 1100 L 940 280 H 640 L 480 120 V -120", stroke: light, width: 26},
    {id: "route-c", d: "M 1560 520 H 1260 L 1160 620 V 1020", stroke: shade, width: 26},
    {id: "route-d", d: "M 120 -120 V 300 L 220 400 V 1020", stroke: light, width: 26},
    {id: "route-e", d: "M 1560 360 H 1340 L 1240 260 V -120", stroke: light, width: 14},
];

const stations: [number, number, string][] = [
    [360, 180, shade],
    [520, 620, shade],
    [1100, 120, light],
    [1260, 520, shade],
    [120, 300, light],
    [940, 280, light],
];

// Pastel takes on the two line colours plus pink and mint. Durations are
// long and negative begin offsets stagger them, so nothing moves in sync.
// Trains sharing a route share a direction and speed so they never collide.
const trains = [
    {route: "route-a", color: "#F6CB9C", cars: 3, duration: 70, begin: -10, reverse: false},
    {route: "route-a", color: "#A6D6E5", cars: 2, duration: 70, begin: -45, reverse: false},
    {route: "route-b", color: "#A6D6E5", cars: 3, duration: 60, begin: -25, reverse: false},
    {route: "route-c", color: "#E9BCCB", cars: 2, duration: 45, begin: -5, reverse: true},
    {route: "route-d", color: "#BCDDB4", cars: 3, duration: 55, begin: -30, reverse: false},
    {route: "route-e", color: "#F6CB9C", cars: 2, duration: 40, begin: -18, reverse: true, small: true},
];

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduced(query.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    return reduced;
}

type Point = [number, number];

// Corner points of a route made of M / H / V / L commands (all the routes
// here are straight segments).
function routePoints(d: string): Point[] {
    const tokens = d.trim().split(/\s+/);
    const points: Point[] = [];
    let x = 0, y = 0;
    for (let i = 0; i < tokens.length;) {
        const command = tokens[i++];
        if (command === "M" || command === "L") {
            x = Number(tokens[i++]);
            y = Number(tokens[i++]);
        } else if (command === "H") {
            x = Number(tokens[i++]);
        } else if (command === "V") {
            y = Number(tokens[i++]);
        }
        points.push([x, y]);
    }
    return points;
}

const cornerRadius = 30;

// The path trains actually follow: the route with each sharp corner swapped
// for a quadratic curve, so rotate="auto" eases carriages round a bend
// instead of snapping them to the new angle. Also returns the length, which
// turns a carriage's spacing into a time delay.
function smoothRoute(points: Point[]): { d: string, length: number } {
    let d = `M ${points[0][0]} ${points[0][1]}`;
    let length = 0;
    let [x, y] = points[0];

    const lineTo = (nextX: number, nextY: number) => {
        d += ` L ${nextX} ${nextY}`;
        length += Math.hypot(nextX - x, nextY - y);
        [x, y] = [nextX, nextY];
    };

    for (let i = 1; i < points.length - 1; i++) {
        const [cx, cy] = points[i];
        const [px, py] = points[i - 1];
        const [nx, ny] = points[i + 1];
        const inLength = Math.hypot(cx - px, cy - py);
        const outLength = Math.hypot(nx - cx, ny - cy);
        const radius = Math.min(cornerRadius, inLength / 2, outLength / 2);

        const startX = cx - (cx - px) / inLength * radius, startY = cy - (cy - py) / inLength * radius;
        const endX = cx + (nx - cx) / outLength * radius, endY = cy + (ny - cy) / outLength * radius;
        lineTo(startX, startY);

        // No closed form worth using for a quadratic's length, so sample it.
        const steps = 16;
        for (let step = 1; step <= steps; step++) {
            const t = step / steps;
            const qx = (1 - t) ** 2 * startX + 2 * (1 - t) * t * cx + t ** 2 * endX;
            const qy = (1 - t) ** 2 * startY + 2 * (1 - t) * t * cy + t ** 2 * endY;
            length += Math.hypot(qx - x, qy - y);
            [x, y] = [qx, qy];
        }
        d += ` Q ${cx} ${cy} ${endX} ${endY}`;
    }

    const [lastX, lastY] = points[points.length - 1];
    lineTo(lastX, lastY);
    return {d, length};
}

const motionRoutes = new Map(routes.map(route => [route.id, smoothRoute(routePoints(route.d))]));

// Each carriage follows the route on its own animateMotion, started later
// the further back it sits, so every carriage turns about its own centre at
// a bend rather than the whole train pivoting as one rigid block.
function Train({route, color, cars, duration, begin, reverse, small}: (typeof trains)[number]) {
    const carLength = small ? 22 : 30;
    const height = small ? 8 : 13;
    const gap = 3;
    const carDelay = (carLength + gap) / motionRoutes.get(route)!.length * duration;

    return (
        <g>
            {Array.from({length: cars}, (_, index) => (
                <rect key={index} x={-carLength / 2} y={-height / 2}
                      width={carLength} height={height} rx={height / 2} fill={color}>
                    <animateMotion dur={`${duration}s`} begin={`${begin + index * carDelay}s`}
                                   repeatCount="indefinite" rotate="auto" calcMode="linear"
                                   keyPoints={reverse ? "1;0" : "0;1"} keyTimes="0;1">
                        <mpath href={`#${route}-motion`}/>
                    </animateMotion>
                </rect>
            ))}
        </g>
    );
}

export default function PlatformBackground() {
    const reducedMotion = usePrefersReducedMotion();

    return (
        <svg
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                {routes.map(route => (
                    <path key={route.id} id={`${route.id}-motion`} d={motionRoutes.get(route.id)!.d}/>
                ))}
            </defs>

            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {routes.map(route => (
                    <path key={route.id} d={route.d} stroke={route.stroke} strokeWidth={route.width}/>
                ))}
                <path d="M -40 760 H 260 L 360 660 H 440" stroke={shade} strokeWidth="14"/>
            </g>

            {stations.map(([cx, cy, color]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="20"
                        fill="var(--color-platform)" stroke={color} strokeWidth="9"/>
            ))}

            {!reducedMotion && trains.map(train => (
                <Train key={`${train.route}-${train.begin}`} {...train}/>
            ))}
        </svg>
    );
}
