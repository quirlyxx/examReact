import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

function TasksPage({ setPage }) {
    const { currentUser } = useAuth();
    const { tasks, projects, updateTaskStatus, removeTask } = useApp();
    const { theme } = useTheme();

    const [filterStatus, setFilterStatus] = useState("Все");
    const [searchText, setSearchText] = useState("");
    const [sortField, setSortField] = useState("deadline");

    const today = new Date().toISOString().split("T")[0];

    const thStyle = {
        padding: "10px 12px", textAlign: "left", fontSize: "12px",
        color: theme.textMuted, fontWeight: "600", borderBottom: `1px solid ${theme.border}`
    };
    const tdStyle = {
        padding: "10px 12px", fontSize: "13px", verticalAlign: "middle", color: theme.text
    };

    const baseTasks = currentUser.role === "admin"
        ? tasks
        : tasks.filter(t => t.ownerId === currentUser.id);

    let filtered = [...baseTasks];

    if (filterStatus !== "Все") {
        filtered = filtered.filter(t => t.status === filterStatus);
    }

    if (searchText !== "") {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchText.toLowerCase()));
    }

    // сортировка
    if (sortField === "deadline") {
        filtered.sort((a, b) => a.deadline.localeCompare(b.deadline));
    } else if (sortField === "priority") {
        const order = { "High": 0, "Medium": 1, "Low": 2 };
        filtered.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortField === "status") {
        filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h4 style={{ margin: 0, color: theme.text }}>Задачи</h4>
                <button
                    onClick={() => setPage("createTask")}
                    style={{ padding: "7px 14px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "13px" }}
                >
                    + Нова задача
                </button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ padding: "6px 10px", border: `1px solid ${theme.inputBorder}`, borderRadius: "4px", fontSize: "13px", width: "180px", backgroundColor: theme.inputBg, color: theme.text }}
                />
                <div style={{ display: "flex", gap: "5px" }}>
                    {["Все", "To Do", "In Progress", "Done"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilterStatus(f)}
                            style={{
                                padding: "5px 12px", borderRadius: "4px", border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: "12px",
                                backgroundColor: filterStatus === f ? "#007bff" : theme.surface,
                                color: filterStatus === f ? "white" : theme.text
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <select
                    value={sortField}
                    onChange={e => setSortField(e.target.value)}
                    style={{ padding: "6px 10px", border: `1px solid ${theme.inputBorder}`, borderRadius: "4px", fontSize: "13px", marginLeft: "auto", backgroundColor: theme.inputBg, color: theme.text }}
                >
                    <option value="deadline">По дедлайну</option>
                    <option value="priority">По пріоритету</option>
                    <option value="status">По статусу</option>
                </select>
            </div>

            <p style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "10px" }}>Найдено: {filtered.length}</p>

            {filtered.length === 0 && (
                <p style={{ color: theme.textMuted, fontSize: "13px" }}>
                    {baseTasks.length === 0 ? "Ви поки що не маєте задач." : "Задачі не знайдені."}
                </p>
            )}

            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
                {filtered.length > 0 && (
                    <thead>
                    <tr style={{ backgroundColor: theme.surfaceAlt }}>
                        <th style={thStyle}>Назва</th>
                        <th style={thStyle}>Проєкт</th>
                        <th style={thStyle}>Пріоритет</th>
                        <th style={thStyle}>Статус</th>
                        <th style={thStyle}>Дедлайн</th>
                        <th style={thStyle}></th>
                    </tr>
                    </thead>
                )}
                <tbody>
                {filtered.map(task => {
                    const project = projects.find(p => p.id === task.projectId);
                    const overdue = task.status !== "Done" && task.deadline < today;
                    const canDelete = currentUser.role === "admin" || task.ownerId === currentUser.id;

                    return (
                        <tr key={task.id} style={{ borderTop: `1px solid ${theme.border}`, backgroundColor: task.status === "Done" ? theme.surfaceAlt : theme.surface }}>
                            <td style={tdStyle}>
                                <div style={{ fontWeight: "500", textDecoration: task.status === "Done" ? "line-through" : "none", color: task.status === "Done" ? theme.textMuted : theme.text }}>
                                    {task.title}
                                </div>
                                <div style={{ fontSize: "11px", color: theme.textMuted }}>{task.desc}</div>
                            </td>
                            <td style={{ ...tdStyle, fontSize: "12px", color: theme.textMuted }}>{project ? project.name : "—"}</td>
                            <td style={tdStyle}>
                                    <span style={{
                                        padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "600",
                                        backgroundColor: task.priority === "High" ? "#f8d7da" : task.priority === "Medium" ? "#fff3cd" : "#d4edda",
                                        color: task.priority === "High" ? "#721c24" : task.priority === "Medium" ? "#856404" : "#155724"
                                    }}>
                                        {task.priority}
                                    </span>
                            </td>
                            <td style={tdStyle}>
                                <select
                                    value={task.status}
                                    onChange={e => updateTaskStatus(task.id, e.target.value)}
                                    style={{ padding: "3px 6px", border: `1px solid ${theme.inputBorder}`, borderRadius: "3px", fontSize: "12px", backgroundColor: theme.inputBg, color: theme.text }}
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
                                {canDelete && (
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

export default TasksPage;