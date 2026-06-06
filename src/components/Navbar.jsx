import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar({ page, setPage }) {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navStyle = {
        backgroundColor: theme.navBg,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white"
    };

    const linkStyle = (active) => ({
        color: active ? "#fff" : "#adb5bd",
        marginRight: "15px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: active ? "bold" : "normal",
        borderBottom: active ? "2px solid #007bff" : "2px solid transparent",
        paddingBottom: "2px"
    });

    return (
        <nav style={navStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontWeight: "bold", fontSize: "16px", marginRight: "20px" }}>ProjectFlow</span>
                <span onClick={() => setPage("dashboard")} style={linkStyle(page === "dashboard")}>Головна</span>
                <span onClick={() => setPage("projects")} style={linkStyle(page === "projects")}>Проєкти</span>
                <span onClick={() => setPage("tasks")} style={linkStyle(page === "tasks")}>Задачі</span>
                <span onClick={() => setPage("stats")} style={linkStyle(page === "stats")}>Статистика</span>
                <span onClick={() => setPage("profile")} style={linkStyle(page === "profile")}>Профіль</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "13px", color: "#adb5bd" }}>
                    {currentUser.username} ({currentUser.role})
                </span>
                <button
                    onClick={toggleTheme}
                    style={{ padding: "5px 10px", backgroundColor: "transparent", border: "1px solid #adb5bd", color: "#adb5bd", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
                >
                    {theme.dark ? "☀ Светлая" : "🌙 Тёмная"}
                </button>
                <button
                    onClick={logout}
                    style={{ padding: "5px 12px", backgroundColor: "#dc3545", border: "none", color: "white", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
                >
                    Выход
                </button>
            </div>
        </nav>
    );
}

export default Navbar;