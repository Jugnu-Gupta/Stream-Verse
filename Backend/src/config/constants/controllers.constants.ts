const uploadDateCriteria: Map<string, number> = new Map([
    ["today", 1],
    ["thisWeek", 7],
    ["thisMonth", 30],
    ["thisYear", 365],
    ["anytime", 365 * 50],
]);

const durationCriteria: Map<string, [number, number]> = new Map([
    ["short", [0, 5 * 60 - 1]],
    ["medium", [5 * 60, 15 * 60]],
    ["long", [15 * 60 + 1, 365 * 24 * 60 * 60]],
    ["any", [0, 365 * 24 * 60 * 60]],
]);

const sortCritieria: Map<string, string> = new Map([
    ["relevance", "score"],
    ["uploadDate", "createdAt"],
    ["views", "views"],
]);

export { uploadDateCriteria, durationCriteria, sortCritieria };
