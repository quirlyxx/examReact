import { createContext, useContext, useState } from "react";
import { users as initialUsers } from "../data/mockData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usersList, setUsersList] = useState(initialUsers);

    let savedUser = null;
    try {
        savedUser = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        console.log("помилка читання з localStorage", e);
    }

    const [currentUser, setCurrentUser] = useState(savedUser);

    function login(username, password) {
        let found = null;
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].username === username && usersList[i].password === password) {
                found = usersList[i];
                break;
            }
        }
        if (found) {
            setCurrentUser(found);
            localStorage.setItem("user", JSON.stringify(found));
            return { ok: true };
        }
        return { ok: false, error: "Невірний логін або пароль" };
    }

    function register(username, password) {
        const exists = usersList.find(u => u.username === username);
        if (exists) {
            return { ok: false, error: "Користувач з таким логіном вже існує" };
        }

        const newUser = {
            id: Date.now(),
            username: username,
            password: password,
            role: "user"
        };

        setUsersList([...usersList, newUser]);
        setCurrentUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        console.log("Новий користувач зареєстрований:", newUser.username);
        return { ok: true };
    }

    function logout() {
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ currentUser, usersList, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}