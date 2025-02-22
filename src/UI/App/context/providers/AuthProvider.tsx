import { useEffect, useState } from "react";
import { AuthContext, ILoggedUser } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const LOGGED_USER = "LOGGED_USER";

interface IAuthProviderProps {
    children: React.ReactNode;
}
interface DecodedToken {
    exp: number;
}

const initialLoggedUser = {
    name: '',
    email: '',
    isLogged: false,
    token: '',
    familyGroup: {
        id: '',
        name: '',
        color: '',
        teacher: '',
        anfitrion: '',
        leaders: [''],
        meetingDay: '',
        meetingTime: ''
    }
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {

    const getStoredUser = () => {
        const savedUser = window.localStorage.getItem(LOGGED_USER);
        return savedUser ? JSON.parse(savedUser) : initialLoggedUser;
    }

    const [loggedUser, setLoggedUser] = useState(() => getStoredUser())

    useEffect(() => {
        const validateStoredUserData = () => {
            const loggedUser = getStoredUser()
            if (loggedUser.token) {
                if (!isValidToken(loggedUser.token)) {
                    removeStoredUser()
                    return;
                }
                setLoggedUser((prevData: ILoggedUser) => ({ ...prevData, isLogged: true }))
            }
        }
        validateStoredUserData();
    }, [])


    const removeStoredUser = () => {
        setLoggedUser(initialLoggedUser);
        window.localStorage.removeItem(LOGGED_USER);
    }

    const isValidToken = (token: string) => {
        const decode = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decode.exp < currentTime) {
            return false;
        }

        return true
    }

    const login = (value: ILoggedUser) => {
        isValidToken(value.token)
        setLoggedUser({ ...value, isLogged: true })
        window.localStorage.setItem(LOGGED_USER, JSON.stringify({ ...value, isLogged: true }))
    }

    const logout = () => {
        removeStoredUser()
    }

    return (
        <AuthContext.Provider value={{ loggedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

