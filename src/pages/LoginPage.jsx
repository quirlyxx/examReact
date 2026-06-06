import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function LoginPage() {
    const { login, register } = useAuth();
    const { theme } = useTheme();

    const [tab, setTab] = useState("login"); // "login" или "register"

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regPassword2, setRegPassword2] = useState("");
    const [regError, setRegError] = useState("");

    function handleLogin() {
        if (loginUsername === "" || loginPassword === "") {
            setLoginError("Заповніть усі поля!");
            return;
        }
        const result = login(loginUsername, loginPassword);
        if (!result.ok) {
            setLoginError(result.error);
        }
    }

    function handleRegister() {
        if (regUsername === "" || regPassword === "" || regPassword2 === "") {
            setRegError("Заповніть усі поля!");
            return;
        }
        if (regUsername.length < 3) {
            setRegError("Логін має бути мінімум 3 символи");
            return;
        }
        if (regPassword.length < 4) {
            setRegError("Пароль має бути мінімум 4 символи");
            return;
        }
        if (regPassword !== regPassword2) {
            setRegError("Паролі не співпадають");
            return;
        }
        const result = register(regUsername, regPassword);
        if (!result.ok) {
            setRegError(result.error);
        }
    }

    const inputStyle = (hasError) => ({
        width: "100%",
        padding: "8px 10px",
        border: hasError ? "1px solid red" : `1px solid ${theme.inputBorder}`,
        borderRadius: "5px",
        fontSize: "14px",
        boxSizing: "border-box",
        backgroundColor: theme.inputBg,
        color: theme.text
    });

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        fontSize: "13px",
        color: theme.textMuted
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: theme.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: theme.surface, padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", width: "340px", border: `1px solid ${theme.border}` }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: theme.text }}>ProjectFlow</h2>

                <div style={{ display: "flex", marginBottom: "20px", borderBottom: `1px solid ${theme.border}` }}>
                    <button
                        onClick={() => { setTab("login"); setLoginError(""); }}
                        style={{
                            flex: 1, padding: "8px", border: "none", cursor: "pointer", fontSize: "13px",
                            backgroundColor: "transparent",
                            color: tab === "login" ? "#007bff" : theme.textMuted,
                            borderBottom: tab === "login" ? "2px solid #007bff" : "2px solid transparent",
                            fontWeight: tab === "login" ? "bold" : "normal"
                        }}
                    >
                        Вхід
                    </button>
                    <button
                        onClick={() => { setTab("register"); setRegError(""); }}
                        style={{
                            flex: 1, padding: "8px", border: "none", cursor: "pointer", fontSize: "13px",
                            backgroundColor: "transparent",
                            color: tab === "register" ? "#007bff" : theme.textMuted,
                            borderBottom: tab === "register" ? "2px solid #007bff" : "2px solid transparent",
                            fontWeight: tab === "register" ? "bold" : "normal"
                        }}
                    >
                        Реєстрація
                    </button>
                </div>

                {tab === "login" && (
                    <div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={labelStyle}>Логин</label>
                            <input
                                type="text"
                                value={loginUsername}
                                onChange={e => setLoginUsername(e.target.value)}
                                style={inputStyle(false)}
                                placeholder="Введіть логін"
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={labelStyle}>Пароль</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                                style={inputStyle(false)}
                                placeholder="Введіть пароль"
                            />
                        </div>
                        {loginError && <p style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>{loginError}</p>}
                        <button
                            onClick={handleLogin}
                            style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "14px", cursor: "pointer" }}
                        >
                            Ввійти
                        </button>
                        <p style={{ marginTop: "15px", fontSize: "12px", color: theme.textMuted, textAlign: "center" }}>
                            Тест: admin/admin або alex/alex
                        </p>
                    </div>
                )}

                {tab === "register" && (
                    <div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={labelStyle}>Логин</label>
                            <input
                                type="text"
                                value={regUsername}
                                onChange={e => setRegUsername(e.target.value)}
                                style={inputStyle(false)}
                                placeholder="Придумайте логін"
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={labelStyle}>Пароль</label>
                            <input
                                type="password"
                                value={regPassword}
                                onChange={e => setRegPassword(e.target.value)}
                                style={inputStyle(false)}
                                placeholder="Придумайте пароль"
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={labelStyle}>Повторите пароль</label>
                            <input
                                type="password"
                                value={regPassword2}
                                onChange={e => setRegPassword2(e.target.value)}
                                style={inputStyle(regPassword2 !== "" && regPassword !== regPassword2)}
                                placeholder="Повторіть пароль"
                            />
                            {regPassword2 !== "" && regPassword !== regPassword2 && (
                                <span style={{ color: "red", fontSize: "12px" }}>Пароли не співпадають</span>
                            )}
                        </div>
                        {regError && <p style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>{regError}</p>}
                        <button
                            onClick={handleRegister}
                            style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", fontSize: "14px", cursor: "pointer" }}
                        >
                            Зареєструватися
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;