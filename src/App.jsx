import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";

function MainApp() {
    const { currentUser } = useAuth();
    const { theme } = useTheme();
    const [page, setPage] = useState("dashboard");

    if (!currentUser) {
        return <LoginPage />;
    }

    function renderPage() {
        if (page === "dashboard") return <Dashboard setPage={setPage} />;
        if (page === "projects") return <ProjectsPage />;
        if (page === "tasks") return <TasksPage setPage={setPage} />;
        if (page === "createTask") return <CreateTaskPage setPage={setPage} />;
        if (page === "stats") return <StatsPage />;
        if (page === "profile") return <ProfilePage />;
        return <Dashboard setPage={setPage} />;
    }

    const activePage = page === "createTask" ? "tasks" : page;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: theme.bg, fontFamily: "Arial, sans-serif" }}>
            <Navbar page={activePage} setPage={setPage} />
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                {renderPage()}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppProvider>
                <AuthProvider>
                    <MainApp />
                </AuthProvider>
            </AppProvider>
        </ThemeProvider>
    );
}