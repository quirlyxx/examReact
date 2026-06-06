import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function StatsPage() {
    const { currentUser } = useAuth();
    const { tasks, projects } = useApp();
    const { theme } = useTheme();

    const today = new Date().toISOString().split("T")[0];

    const myTasks = currentUser.role === "admin"
        ? tasks
        : tasks.filter(t => t.ownerId === currentUser.id);

    const myProjects = currentUser.role === "admin"
        ? projects
        : projects.filter(p => p.ownerId === currentUser.id);

    const total = myTasks.length;
    const done = myTasks.filter(t => t.status === "Done").length;
    const inProgress = myTasks.filter(t => t.status === "In Progress").length;
    const todo = myTasks.filter(t => t.status === "To Do").length;
    const overdue = myTasks.filter(t => t.status !== "Done" && t.deadline < today).length;

    const rows = [
        { label: "Зроблено", value: done, color: "#28a745" },
        { label: "В процесі", value: inProgress, color: "#17a2b8" },
        { label: "Не почато", value: todo, color: "#6c757d" },
        { label: "Протерміновано", value: overdue, color: "#dc3545" },
    ];

    const thStyle = {
        padding: "10px 12px", textAlign: "left", fontSize: "12px",
        color: theme.textMuted, fontWeight: "600", borderBottom: `1px solid ${theme.border}`
    };
    const tdStyle = {
        padding: "10px 12px", fontSize: "13px", verticalAlign: "middle", color: theme.text
    };

    return (
        <div style={{ padding: "20px" }}>
            <h4 style={{ marginBottom: "20px", color: theme.text }}>Статистика</h4>

            {total === 0 && (
                <p style={{ color: theme.textMuted, fontSize: "13px" }}>Немаюїє даних.</p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "25px" }}>
                {[{ label: "Усього задач", value: total, color: "#007bff" }, ...rows].map(item => (
                    <div key={item.label} style={{
                        backgroundColor: theme.surface, border: `1px solid ${theme.border}`,
                        borderRadius: "6px", padding: "14px 18px", minWidth: "120px",
                        borderLeft: `4px solid ${item.color}`
                    }}>
                        <div style={{ fontSize: "26px", fontWeight: "bold", color: item.color }}>{item.value}</div>
                        <div style={{ fontSize: "12px", color: theme.textMuted }}>{item.label}</div>
                    </div>
                ))}
            </div>

            {total > 0 && (
                <>
                    <h6 style={{ marginBottom: "12px", color: theme.text }}>Розподіл задач</h6>
                    <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "15px", marginBottom: "25px", maxWidth: "500px" }}>
                        {rows.map(row => (
                            <div key={row.label} style={{ marginBottom: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                                    <span style={{ color: theme.text }}>{row.label}</span>
                                    <span style={{ color: theme.textMuted }}>{row.value} / {total}</span>
                                </div>
                                <div style={{ backgroundColor: theme.border, borderRadius: "3px", height: "8px" }}>
                                    <div style={{
                                        width: total > 0 ? (row.value / total * 100) + "%" : "0%",
                                        backgroundColor: row.color, height: "100%", borderRadius: "3px"
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <h6 style={{ marginBottom: "12px", color: theme.text }}>Прогрес по проєктах</h6>

            {myProjects.length === 0 && (
                <p style={{ color: theme.textMuted, fontSize: "13px" }}>Немає проєктів.</p>
            )}

            {myProjects.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
                    <thead>
                    <tr style={{ backgroundColor: theme.surfaceAlt }}>
                        <th style={thStyle}>Проєкт</th>
                        <th style={thStyle}>Задач</th>
                        <th style={thStyle}>Виповнено</th>
                        <th style={thStyle}>Прогрес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myProjects.map(p => {
                        const ptasks = tasks.filter(t => t.projectId === p.id);
                        const pdone = ptasks.filter(t => t.status === "Done").length;
                        const pct = ptasks.length > 0 ? Math.round(pdone / ptasks.length * 100) : 0;
                        return (
                            <tr key={p.id} style={{ borderTop: `1px solid ${theme.border}` }}>
                                <td style={tdStyle}>{p.name}</td>
                                <td style={tdStyle}>{ptasks.length}</td>
                                <td style={tdStyle}>{pdone}</td>
                                <td style={{ ...tdStyle, width: "200px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <div style={{ flex: 1, backgroundColor: theme.border, borderRadius: "3px", height: "6px" }}>
                                            <div style={{ width: pct + "%", backgroundColor: "#007bff", height: "100%", borderRadius: "3px" }} />
                                        </div>
                                        <span style={{ fontSize: "12px", color: theme.textMuted, minWidth: "30px" }}>{pct}%</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StatsPage;