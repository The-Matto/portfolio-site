import {Project, ProjectTag, projects} from "./projects-data.tsx";

// The site is styled as Tokyo transit signage: every project is a "station"
// on one of two lines, with a station code like G01 / W02.
export interface TransitLine {
    id: "G" | "W";
    name: string;
    nameJp: string;
    // Hex rather than a Tailwind class so it can drive inline styles
    // (borders, route segments) without needing safelisted classes.
    color: string;
}

export const transitLines: Record<TransitLine["id"], TransitLine> = {
    G: {id: "G", name: "Game Dev", nameJp: "ゲーム開発", color: "#F39700"},
    W: {id: "W", name: "Web", nameJp: "ウェブ", color: "#009BBF"},
};

const gameTags = new Set<ProjectTag>([ProjectTag.GameDev, ProjectTag.UnrealEngine, ProjectTag.Cpp]);

export interface Station {
    line: TransitLine;
    code: string;
}

// Numbered per line in list order, so reordering projects-data renumbers
// the stations automatically.
const stations = new Map<string, Station>();
const lineCounters: Record<TransitLine["id"], number> = {G: 0, W: 0};
for (const project of projects) {
    const line = project.tags.some(tag => gameTags.has(tag)) ? transitLines.G : transitLines.W;
    lineCounters[line.id] += 1;
    stations.set(project.id, {line, code: `${line.id}${String(lineCounters[line.id]).padStart(2, "0")}`});
}

export function getStation(project: Project): Station {
    return stations.get(project.id)!;
}
