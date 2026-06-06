import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

function ProjectDetail({ projectId, onBack }) {
    const { currentUser } = useAuth();
    const { projects, tasks, updateTaskStatus, removeTask } = useApp();
    const { theme } = useTheme();

    const thStyle = {
        padding: "10px 12px", textAlign: "left", fontSize: "12px",
        color: theme.textMuted, fontWeight: "600", borderBottom: `1px solid ${theme.border}`
    };
    const tdStyle = {
        padding: "10px 12px", fontSize: "13px", verticalAlign: "middle", color: theme.text
    };

    const project = projects.find(p => p.id === projectId);
    if (!project) return <div style={{ padding: "20px", color: theme.text }}>Проект не найден</div>;

    const ptasks = tasks.filter(t => t.projectId === projectId);
    const today = new Date().toISOString().split("T")[0];

    return (
        <div style={{ padding: "20px" }}>
            <button
                onClick={onBack}
                style={{ marginBottom: "15px", padding: "6px 12px", backgroundColor: "transparent", border: `1px solid ${theme.border}`, borderRadius: "4px", cursor: "pointer", fontSize: "13px", color: theme.textMuted }}
            >
                ← Назад
            </button>

            <h4 style={{ marginBottom: "4px", color: theme.text }}>{project.name}</h4>
            <p style={{ color: theme.textMuted, fontSize: "13px", marginBottom: "20px" }}>{project.desc}</p>

            <h6 style={{ marginBottom: "10px", color: theme.text }}>Задачи ({ptasks.length})</h6>
            {ptasks.length === 0 && <p style={{ color: theme.textMuted, fontSize: "13px" }}>Задач поки немає</p>}

            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
                {ptasks.length > 0 && (
                    <thead>
                    <tr style={{ backgroundColor: theme.surfaceAlt }}>
                        <th style={thStyle}>Задача</th>
                        <th style={thStyle}>Пріоритет</th>
                        <th style={thStyle}>Статус</th>
                        <th style={thStyle}>Дедлайн</th>
                        <th style={thStyle}></th>
                    </tr>
                    </thead>
                )}
                <tbody>
                {ptasks.map(task => {
                    const overdue = task.status !== "Done" && task.deadline < today;
                    return (
                        <tr key={task.id} style={{ borderTop: `1px solid ${theme.border}` }}>
                            <td style={tdStyle}>
                                <div style={{ fontWeight: "500" }}>{task.title}</div>
                                <div style={{ fontSize: "12px", color: theme.textMuted }}>{task.desc}</div>
                            </td>
                            <td style={tdStyle}>
                                    <span style={{
                                        padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "600",
                                        backgroundColor: task.priority === "High" ? "#f8d7da" : task.priority === "Medium" ? "#fff3cd" : "#d4edda",
                                        color: task.priority === "High" ? "#721c24" : task.priority === "Medium" ? "#856404" : "#155724"
                                    }}>{task.priority}</span>
                            </td>
                            <td style={tdStyle}>
                                <select
                                    value={task.status}
                                    onChange={e => updateTaskStatus(task.id, e.target.value)}
                                    style={{ padding: "3px 6px", borderRadius: "3px", border: `1px solid ${theme.inputBorder}`, fontSize: "12px", backgroundColor: theme.inputBg, color: theme.text }}
                                >
                                    <option>To Do</option>
                                    <option>In Progress</option>
                                    <option>Done</option>
                                </select>
                            </td>
                            <td style={{ ...tdStyle, color: overdue ? "red" : theme.text, fontSize: "13px" }}>
                                {overdue ? "⚠ " : ""}{task.deadline}
                            </td>
                            <td style={tdStyle}>
                                {(currentUser.role === "admin" || task.ownerId === currentUser.id) && (
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        style={{ padding: "3px 8px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "12px" }}
                                    >
                                        Видалити
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectDetail;