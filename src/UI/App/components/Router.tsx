import { PrivateRoutes, PublicRoutes } from "../config/RoutesConfig"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Navigation } from "./Navigation"
import { useAuth } from "../hooks"

export const Router = () => {
    const auth = useAuth()
    console.log(auth?.loggedUser.isLogged)
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                {
                    auth?.loggedUser.isLogged
                        ? (PrivateRoutes.map((item, index) => <Route
                            key={index}
                            path={item.path}
                            element={auth?.loggedUser.isLogged ? item.element : <Navigate to="/login" replace />} />))
                        : (PublicRoutes.map((item, index) => <Route
                            key={index}
                            path={item.path}
                            element={auth?.loggedUser.isLogged ? <Navigate to="/dashboard" replace /> : item.element}
                        />))
                }
            </Routes>
        </BrowserRouter>
    )
}
