import { Navigate } from "react-router-dom";
import { LoginPage } from "../../Auth/Login/LoginPage";
import { RegisterPage } from "../../Auth/Register/RegisterPage";
import { DashboardPage } from "../../Dashboard/DashboardPage";
import { CreateReport } from "../../Report/Create/CreateReport";

export const PrivateRoutes = [
    { path: "/dashboard", element: <DashboardPage />, private: true },
    { path: "/nuevo", element: <CreateReport />, private: true },
    { path: "*", element: <Navigate to="/dashboard" replace={true} />, isPrivate: true },
]
export const PublicRoutes = [
    { path: "/login", element: <LoginPage />, private: false },
    { path: "/registro", element: <RegisterPage />, private: false },
    { path: "*", element: <Navigate to="/login" replace={true} />, isPrivate: false },
]