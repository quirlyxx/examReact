import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { users as initialUsers } from "../data/mockData";

function ProfilePage() {
    const { currentUser, usersList } = useAuth();
    const { tasks, projects } = useApp();
    const { theme } = useTheme();

    const myTasks = tasks.filter(t => t.ownerId === currentUser.id);
    const myProjects = projects.filter(p => p.ownerId === currentUser.id);
    const myDone = myTasks.filter(t => t.status === "Done").length;

    const thStyle = {
        padding: "10px 12px", textAlign: "left", fontSize: "12px",
        color: theme.textMuted, fontWeight: "600", borderBottom: `1px solid ${theme.border}`
    };
    const tdStyle = {
        padding: "10px 12px", fontSize: "13px", verticalAlign: "middle", color: theme.text
    };

    return (
        <div style={{ padding: "20px" }}>
            <h4 style={{ marginBottom: "20px", color: theme.text }}>Профіль</h4>

            <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "20px", maxWidth: "420px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${theme.border}` }}>
                    <div style={{
                        width: "50px", height: "50px", borderRadius: "50%",
                        backgroundColor: "#007bff", color: "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "20px", fontWeight: "bold"
                    }}>
                        {currentUser.username[0].toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontWeight: "600", fontSize: "16px", color: theme.text }}>{currentUser.username}</div>
                        <div style={{ fontSize: "12px", marginTop: "4px" }}>
                            <span style={{
                                backgroundColor: currentUser.role === "admin" ? "#fff3cd" : "#cce5ff",
                                color: currentUser.role === "admin" ? "#856404" : "#004085",
                                padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "600"
                            }}>
                                {currentUser.role}
                            </span>
                        </div>
                    </div>
                </div>

                {[
                    ["Мої задачі", myTasks.length],
                    ["Мої проєкти", myProjects.length],
                    ["Завершно задач", myDone],
                ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", marginBottom: "10px", borderBottom: `1px solid ${theme.border}`, fontSize: "13px" }}>
                        <span style={{ color: theme.textMuted }}>{label}</span>
                        <span style={{ fontWeight: "600", color: theme.text }}>{val}</span>
                    </div>
                ))}
            </div>

            {currentUser.role === "admin" && (
                <div>
                    <h6 style={{ marginBottom: "10px", color: theme.text }}>Все пользователи</h6>
                    <table style={{ width: "100%", maxWidth: "420px", borderCollapse: "collapse", backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
                        <thead>
                        <tr style={{ backgroundColor: theme.surfaceAlt }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Логин</th>
                            <th style={thStyle}>Роль</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersList.map(u => (
                            <tr key={u.id} style={{ borderTop: `1px solid ${theme.border}` }}>
                                <td style={tdStyle}>{u.id}</td>
                                <td style={tdStyle}>{u.username}</td>
                                <td style={tdStyle}>
                                        <span style={{
                                            backgroundColor: u.role === "admin" ? "#fff3cd" : "#cce5ff",
                                            color: u.role === "admin" ? "#856404" : "#004085",
                                            padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "600"
                                        }}>
                                            {u.role}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;