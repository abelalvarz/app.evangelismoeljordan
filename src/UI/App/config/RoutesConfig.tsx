import { Navigate } from "react-router-dom";
import { LoginPage } from "../../Auth/Login/LoginPage";
import { RegisterPage } from "../../Auth/Register/RegisterPage";
import { DashboardPage } from "../../Dashboard/DashboardPage";
import { CreateReport } from "../../Report/Create/CreateReport";
import { ReportDetailComponent } from "../../Report/View/ReportDetailComponet.tsx/ReportDetailComponent";

export const PrivateRoutes = [
    { path: "/dashboard", element: <DashboardPage />, private: true },
    { path: "/nuevo", element: <CreateReport />, private: true },
    { path: "/reporte/:id", element: <ReportDetailComponent />, private: true },
    { path: "*", element: <Navigate to="/dashboard" replace={true} />, isPrivate: true },
]
export const PublicRoutes = [
    { path: "/", element: <LoginPage />, private: false },
    { path: "/registro", element: <RegisterPage />, private: false },
    { path: "*", element: <Navigate to="/" replace={true} />, isPrivate: false },
]