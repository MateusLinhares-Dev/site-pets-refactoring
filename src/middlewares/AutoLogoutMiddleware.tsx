import { Outlet } from "react-router";
import { AutoLogout } from "../hooks/useAutoLogout"

export const LogoutMiddleware = () => {
    AutoLogout();

    return <Outlet></Outlet>
}