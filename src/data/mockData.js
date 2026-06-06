export const users = [
    { id: 1, username: "admin", password: "admin", role: "admin" },
    { id: 2, username: "alex", password: "alex", role: "user" },
];

export const projectsData = [
    { id: 1, name: "Minecraft Plugin", desc: "PathsSystem update", ownerId: 1 },
    { id: 2, name: "Finance App", desc: "Budget tracker with charts", ownerId: 2 },
    { id: 3, name: "React Exam", desc: "ProjectFlow exam project", ownerId: 1 },
    { id: 4, name: "Portfolio", desc: "Personal portfolio website", ownerId: 2 },
];

export const tasksData = [
    { id: 1, title: "Create clan GUI", desc: "Add GUI for clan leaders", priority: "High", status: "In Progress", deadline: "2026-06-20", projectId: 1, ownerId: 1 },
    { id: 2, title: "New Skills system", desc: "Implement skill tree", priority: "Medium", status: "To Do", deadline: "2026-06-25", projectId: 1, ownerId: 1 },
    { id: 3, title: "Fix Bugs", desc: "Fix reported bugs", priority: "High", status: "Done", deadline: "2026-06-10", projectId: 1, ownerId: 1 },
    { id: 4, title: "Setup routes", desc: "React Router config", priority: "Low", status: "Done", deadline: "2026-06-01", projectId: 3, ownerId: 1 },
    { id: 5, title: "Auth context", desc: "JWT auth implementation", priority: "High", status: "In Progress", deadline: "2026-06-15", projectId: 3, ownerId: 1 },
    { id: 6, title: "Budget chart", desc: "Add recharts diagram", priority: "Medium", status: "To Do", deadline: "2026-07-01", projectId: 2, ownerId: 2 },
    { id: 7, title: "Login page", desc: "Design login form", priority: "Low", status: "Done", deadline: "2026-05-28", projectId: 2, ownerId: 2 },
    { id: 8, title: "Hero section", desc: "Portfolio hero", priority: "Medium", status: "To Do", deadline: "2026-07-10", projectId: 4, ownerId: 2 },
];