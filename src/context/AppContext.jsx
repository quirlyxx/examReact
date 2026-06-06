import { createContext, useContext, useState } from "react";
import { projectsData, tasksData } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [projects, setProjects] = useState(projectsData);
    const [tasks, setTasks] = useState(tasksData);

    function addProject(name, desc, ownerId) {
        const newProject = {
            id: Date.now(),
            name: name,
            desc: desc,
            ownerId: ownerId
        };
        setProjects([...projects, newProject]);
    }

    function removeProject(id) {
        const filtered = projects.filter(p => p.id !== id);
        setProjects(filtered);
        const filteredTasks = tasks.filter(t => t.projectId !== id);
        setTasks(filteredTasks);
    }

    function addTask(taskObj) {
        const temp = { ...taskObj, id: Date.now() };
        setTasks([...tasks, temp]);
    }

    function updateTaskStatus(id, newStatus) {
        const updated = tasks.map(t => {
            if (t.id === id) {
                return { ...t, status: newStatus };
            }
            return t;
        });
        setTasks(updated);
    }

    function removeTask(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    return (
        <AppContext.Provider value={{ projects, tasks, addProject, removeProject, addTask, updateTaskStatus, removeTask }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}