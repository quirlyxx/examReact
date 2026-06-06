import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import ProjectDetail from "./ProjectDetail";

function ProjectsPage() {
    const { currentUser } = useAuth();
    const { projects, tasks, addProject, removeProject } = useApp();
    const { theme } = useTheme();

    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [nameError, setNameError] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);

    const visibleProjects = currentUser.role === "admin"
        ? projects
        : projects.filter(p => p.ownerId === currentUser.id);

    function handleAdd() {
        if (newName.trim() === "") {
            setNameError("Назва обовязкова");
            return;
        }
        if (newName.trim().length < 3) {
            setNameError("Мінімум 3 символи");
            return;
        }
        setNameError("");
        addProject(newName.trim(), newDesc.trim(), currentUser.id);
        setNewName("");
        setNewDesc("");
        setShowForm(false);
    }

    if (selectedProject !== null) {
        return <ProjectDetail projectId={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    const inputStyle = {
        width: "100%", padding: "7px 10px", borderRadius: "4px",
        fontSize: "13px", boxSizing: "border-box",
        backgroundColor: theme.inputBg, color: theme.text,
        border: `1px solid ${theme.inputBorder}`
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h4 style={{ margin: 0, color: theme.text }}>Проєкти</h4>
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{ padding: "7px 14px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "13px" }}
                >
                    + Додати проєкт
                </button>
            </div>

            {showForm && (
                <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "15px", marginBottom: "15px" }}>
                    <h6 style={{ marginBottom: "12px", color: theme.text }}>Новий проєкт</h6>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ fontSize: "13px", display: "block", marginBottom: "4px", color: theme.textMuted }}>Название *</label>
                        <input
                            value={newName}
                            onChange={e => { setNewName(e.target.value); setNameError(""); }}
                            style={{ ...inputStyle, border: nameError ? "1px solid red" : `1px solid ${theme.inputBorder}` }}
                            placeholder="Назва проєкту"
                        />
                        {nameError && <span style={{ color: "red", fontSize: "12px" }}>{nameError}</span>}
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ fontSize: "13px", display: "block", marginBottom: "4px", color: theme.textMuted }}>Опис</label>
                        <input
                            value={newDesc}
                            onChange={e => setNewDesc(e.target.value)}
                            style={inputStyle}
                            placeholder="Короткий опис"
                        />
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={handleAdd} style={{ padding: "7px 14px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Створити</button>
                        <button onClick={() => { setShowForm(false); setNameError(""); }} style={{ padding: "7px 14px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Назад</button>
                    </div>
                </div>
            )}

            {visibleProjects.length === 0 && (
                <p style={{ color: theme.textMuted, fontSize: "13px" }}>Проєктів нема. Створіть перший!</p>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {visibleProjects.map(p => {
                    const ptasks = tasks.filter(t => t.projectId === p.id);
                    const doneCount = ptasks.filter(t => t.status === "Done").length;
                    const percent = ptasks.length > 0 ? Math.round(doneCount / ptasks.length * 100) : 0;

                    return (
                        <div
                            key={p.id}
                            onClick={() => setSelectedProject(p.id)}
                            style={{
                                backgroundColor: theme.surface,
                                border: `1px solid ${theme.border}`,
                                borderRadius: "6px",
                                padding: "15px",
                                width: "240px",
                                cursor: "pointer",
                                position: "relative"
                            }}
                        >
                            <div style={{ fontWeight: "600", marginBottom: "5px", fontSize: "15px", color: theme.text }}>{p.name}</div>
                            <div style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "10px" }}>{p.desc}</div>
                            <div style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "6px" }}>{ptasks.length} задач • {doneCount} виповнено</div>
                            <div style={{ backgroundColor: theme.border, borderRadius: "3px", height: "5px" }}>
                                <div style={{ width: percent + "%", backgroundColor: "#007bff", height: "100%", borderRadius: "3px" }} />
                            </div>
                            <div style={{ fontSize: "11px", color: theme.textMuted, marginTop: "3px" }}>{percent}%</div>

                            {(currentUser.role === "admin" || p.ownerId === currentUser.id) && (
                                <button
                                    onClick={e => { e.stopPropagation(); removeProject(p.id); }}
                                    style={{
                                        position: "absolute", top: "8px", right: "8px",
                                        backgroundColor: "#dc3545", color: "white", border: "none",
                                        borderRadius: "3px", padding: "2px 7px", fontSize: "11px", cursor: "pointer"
                                    }}
                                >✕</button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectsPage;