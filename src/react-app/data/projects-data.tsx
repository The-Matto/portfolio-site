export enum ProjectTag {
    BrowserExtension = "Browser Extension",
    UnrealEngine = "Unreal Engine",
    Cpp = "C++",
    GameDev = "Game Dev",
    React = "React",
    TypeScript = "TypeScript",
    Node = "Node",
    Cloudflare = "Cloudflare",
    Backend = "Backend",
    Frontend = "Frontend",
    Fullstack = "Fullstack",
    Redis = "Redis",
    Postgres = "Postgres",
}

export interface ProjectImageMedia {
    type: "image";
    src: string;
}

export interface ProjectYoutubeMedia {
    type: "youtube";
    videoId: string;
}

export type ProjectMedia = ProjectImageMedia | ProjectYoutubeMedia;

export function image(src: string): ProjectMedia {
    return { type: "image", src };
}

export function youtube(videoId: string): ProjectMedia {
    return { type: "youtube", videoId };
}

// YouTube serves a thumbnail for any video at this URL with no API key
// needed, used for video slides before they're played and for card covers.
export function getMediaThumbnailSrc(media: ProjectMedia): string {
    return media.type === "image" ? media.src : `https://img.youtube.com/vi/${media.videoId}/hqdefault.jpg`;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    media?: ProjectMedia[];
    tags: ProjectTag[];
    githubLink?: string;
    liveLink?: string;
}

export const projects: Project[] = [
    {
        id: "project-nova-game",
        title: "Nova Game",
        description: "A web-based time-trial First Person Shooter built around speedrunning user created levels, hitting targets, and climbing leaderboards. It comes with an in-browser level editor that includes a free-fly pawn, transform gizmos, palette controls, and local/cloud save-state sharing so players can build and share their levels. Under the hood, it runs on a TypeScript, Three.js and React frontend hosted on Cloudflare Pages, with a Node backend on Railway backed by PostgreSQL and Redis. User levels and thumbnails are stored in Cloudflare R2, and accounts start out anonymous with the option to claim them later via GitHub login.",
        tags: [ProjectTag.React, ProjectTag.TypeScript, ProjectTag.Cloudflare, ProjectTag.Frontend, ProjectTag.Redis, ProjectTag.Postgres],
        githubLink: "https://github.com/The-Matto/nova-game",
        liveLink: "https://nova.mattheritage.dev/",
        media: [image("/projects/Nova-game/nova-game_1.jpg"), image("/projects/Nova-game/nova-game_2.jpg"), image("/projects/Nova-game/nova-game_3.jpg")]


    },
    {
        id: "project-clarity-engine",
        title: "C++ OpenGL Game Engine",
        description: "I wanted a deeper understanding of how engines like Unreal and Unity actually work, so I built one from scratch.\n\nI architected and developed a modular 3D engine using OpenGL, C++ and GLFW, featuring decoupled subsystems, JSON-based level serialization, Phong lighting, and model loading via Assimp. I also built a custom reflection system for real-time variable updates and an asset manager for automatic asset discovery and management, and used Premake to maintain a consistent, cross-platform, multi-IDE build environment.\n\nI'm currently extending the engine with a module-based DLL architecture to support hot-reloadable systems, along with shader hot reloading.",
        tags: [ProjectTag.Cpp, ProjectTag.GameDev],
        media: [image("/projects/Clarity/ClarityEngine_1.jpg")]
    },
    {
        id: "project-inventory-system",
        title: "Grid Based Inventory System",
        description: "Built a grid-based inventory system inspired by Resident Evil 4 for a hobby project. Items are managed as UObject instances inside a custom UActorComponent (UGridContainer), with state serialization handled via FInstancedStruct.\n\nHovering an item opens a tooltip with more information about it, including a diagram of the slots it takes up. I drew that diagram with a custom Slate widget, so it renders as a single widget instead of up to 16 child UMG widgets (one per grid cell), cutting the UObject count and layout work for every tooltip.",
        tags: [ProjectTag.UnrealEngine, ProjectTag.GameDev],
        media: [youtube("OXEIT8Hv2aY"), image("/projects/grid-inventory/inventory_1.jpg"), image("/projects/grid-inventory/inventory_2.jpg")]
    },
    {
        id: "project-dungeon-generator",
        title: "Procedural Dungeon Builder",
        description: "Developed a procedural dungeon generator that algorithmically stitches artist-designed levels into a walkable path, then populates each room with variable enemy spawns and randomized loot.\n\nGeneration is configurable, so boss rooms can be placed at the end of the path, and specific categories of room can be limited to certain depths in the level.",
        tags: [ProjectTag.UnrealEngine, ProjectTag.GameDev],
        media: [image("/projects/Dungeon-builder/dungeon_1.jpg"), image("/projects/Dungeon-builder/dungeon_2.jpg")]
    },
    {
        id: "project-portfolio",
        title: "This Portfolio",
        description: "This portfolio website was built with React, TypeScript and Tailwind, deployed on Cloudflare Pages.",
        tags: [ProjectTag.React, ProjectTag.TypeScript, ProjectTag.Cloudflare, ProjectTag.Frontend],
        githubLink: "https://github.com/The-Matto/vite-react-template",
    },
    {
        id: "project-basic-chrome-mouse-gestures",
        title: "Basic Chrome Mouse Gestures",
        description: "Chrome still lacks native mouse-gesture navigation, so I built a lightweight extension to fill the gap. Using an injected content script, it maps right-click hold combinations and cardinal mouse movements to core browser actions (e.g., holding right-click and moving West switches to the previous tab, while Far North restores a closed tab). Built with vanilla JavaScript and the Chrome Extensions API.",
        tags: [ProjectTag.BrowserExtension],
        githubLink: "https://github.com/The-Matto/chrome-basic-mouse-gestures",
        media: [image("/projects/chrome-mouse-gestures/mouse-gestures_1.jpg")]
    },
];
