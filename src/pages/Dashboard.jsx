import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

function Dashboard({ setPage }) {
    const { currentUser } = useAuth();
    const { projects, tasks } = useApp();
    const { theme } = useTheme();

    const today = new Date().toISOString().split("T")[0];

    const myProjects = currentUser.role === "admin"
        ? projects
        : projects.filter(p => p.ownerId === currentUser.id);

    const myTasks = currentUser.role === "admin"
        ? tasks
        : tasks.filter(t => t.ownerId === currentUser.id);

    const doneTasks = myTasks.filter(t => t.status === "Done");
    const inProgressTasks = myTasks.filter(t => t.status === "In Progress");
    const overdueTasks = myTasks.filter(t => t.status !== "Done" && t.deadline < today);

    return (
        <div style={{ padding: "20px" }}>
            <h4 style={{ marginBottom: "5px", color: theme.text }}>Вітаю, {currentUser.username}!</h4>
            <p style={{ color: theme.textMuted, fontSize: "14px", marginBottom: "20px" }}>Огляд вашої активності</p>

            <div style={{ display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" }}>
                {[
                    { label: "Проєкти", value: myProjects.length, color: "#007bff" },
                    { label: "Всего задач", value: myTasks.length, color: "#6c757d" },
                    { label: "Виповнено", value: doneTasks.length, color: "#28a745" },
                    { label: "У роботі", value: inProgressTasks.length, color: "#17a2b8" },
                    { label: "Протерміновано", value: overdueTasks.length, color: "#dc3545" },
                ].map(item => (
                    <div key={item.label} style={{
                        backgroundColor: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: "6px",
                        padding: "15px 20px",
                        minWidth: "120px",
                        borderTop: `3px solid ${item.color}`
                    }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: item.color }}>{item.value}</div>
                        <div style={{ fontSize: "12px", color: theme.textMuted, marginTop: "4px" }}>{item.label}</div>
                    </div>
                ))}
            </div>

            <h5 style={{ marginBottom: "12px", color: theme.text }}>Останні проєкти</h5>

            {myProjects.length === 0 && (
                <p style={{ color: theme.textMuted, fontSize: "13px" }}>У вас поки немає проєктів.</p>
            )}

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {myProjects.slice(0, 3).map(p => {
                    const ptasks = tasks.filter(t => t.projectId === p.id);
                    const doneCount = ptasks.filter(t => t.status === "Done").length;
                    const percent = ptasks.length > 0 ? Math.round(doneCount / ptasks.length * 100) : 0;

                    return (
                        <div key={p.id} style={{
                            backgroundColor: theme.surface,
                            border: `1px solid ${theme.border}`,
                            borderRadius: "6px",
                            padding: "15px",
                            width: "220px"
                        }}>
                            <div style={{ fontWeight: "600", marginBottom: "5px", color: theme.text }}>{p.name}</div>
                            <div style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "10px" }}>{p.desc}</div>
                            <div style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "5px" }}>{ptasks.length} задач • {doneCount} готово</div>
                            <div style={{ backgroundColor: theme.border, borderRadius: "3px", height: "6px" }}>
                                <div style={{ width: percent + "%", backgroundColor: "#007bff", height: "100%", borderRadius: "3px" }} />
                            </div>
                            <div style={{ fontSize: "11px", color: theme.textMuted, marginTop: "4px" }}>{percent}%</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Dashboard;