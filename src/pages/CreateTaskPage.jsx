import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

function CreateTaskPage({ setPage }) {
    const { currentUser } = useAuth();
    const { projects, addTask } = useApp();
    const { theme } = useTheme();

    const today = new Date().toISOString().split("T")[0];

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("To Do");
    const [deadline, setDeadline] = useState(today);
    const [projectId, setProjectId] = useState(projects[0]?.id || "");
    const [errors, setErrors] = useState({});

    function validate() {
        let errs = {};
        if (title.trim() === "") {
            errs.title = "Назва обовязкова";
        } else if (title.trim().length < 3) {
            errs.title = "Мінімум 3 символи";
        }
        if (deadline === "") {
            errs.deadline = "Вкажіть дедлайн";
        } else if (deadline < today) {
            errs.deadline = "Дедлайн не може буьт в иминулому";
        }
        return errs;
    }

    function handleCreate() {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        addTask({
            title: title.trim(),
            desc: desc.trim(),
            priority,
            status,
            deadline,
            projectId: Number(projectId),
            ownerId: currentUser.id
        });
        console.log("Задача створено успіщно");
        setPage("tasks");
    }

    const fieldStyle = { marginBottom: "14px" };
    const labelS = { display: "block", marginBottom: "4px", fontSize: "13px", color: theme.textMuted };
    const inputS = (hasError) => ({
        width: "100%", padding: "7px 10px",
        border: hasError ? "1px solid red" : `1px solid ${theme.inputBorder}`,
        borderRadius: "4px", fontSize: "13px", boxSizing: "border-box",
        backgroundColor: theme.inputBg, color: theme.text
    });

    return (
        <div style={{ padding: "20px" }}>
            <button
                onClick={() => setPage("tasks")}
                style={{ marginBottom: "15px", padding: "6px 12px", backgroundColor: "transparent", border: `1px solid ${theme.border}`, borderRadius: "4px", cursor: "pointer", fontSize: "13px", color: theme.textMuted }}
            >
                ← Назад
            </button>

            <h4 style={{ marginBottom: "20px", color: theme.text }}>Создать задачу</h4>

            <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "20px", maxWidth: "480px" }}>
                <div style={fieldStyle}>
                    <label style={labelS}>Назва *</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} style={inputS(errors.title)} placeholder="Назва задачі" />
                    {errors.title && <span style={{ color: "red", fontSize: "12px" }}>{errors.title}</span>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelS}>Опис</label>
                    <input value={desc} onChange={e => setDesc(e.target.value)} style={inputS(false)} placeholder="Опис задачі" />
                </div>
                <div style={fieldStyle}>
                    <label style={labelS}>Приоритет</label>
                    <select value={priority} onChange={e => setPriority(e.target.value)} style={inputS(false)}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div style={fieldStyle}>
                    <label style={labelS}>Статус</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} style={inputS(false)}>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>
                </div>
                <div style={fieldStyle}>
                    <label style={labelS}>Дедлайн *</label>
                    <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} min={today} style={inputS(errors.deadline)} />
                    {errors.deadline && <span style={{ color: "red", fontSize: "12px" }}>{errors.deadline}</span>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelS}>Проєкт</label>
                    <select value={projectId} onChange={e => setProjectId(e.target.value)} style={inputS(false)}>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
                    <button onClick={handleCreate} style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Створити</button>
                    <button onClick={() => setPage("tasks")} style={{ padding: "8px 16px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Назад</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTaskPage;