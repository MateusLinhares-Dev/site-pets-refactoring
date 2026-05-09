import { Route, Routes } from "react-router"
import { Login } from "../pages/login/login"
import { LogoutMiddleware } from "../middlewares/AutoLogoutMiddleware"
import { Pets } from "../pages/pets/Pets"
import { CadastroPet } from "../pages/pets/CadastroPets"

export const RoutesApp = () => {  
    return (
    <Routes>
        <Route path="/" element={<Login/>}/>

        <Route element={<LogoutMiddleware></LogoutMiddleware>}>
            <Route path="/pets" element={<Pets></Pets>}></Route>
            
            <Route path="/cadastro-pet" element={<CadastroPet></CadastroPet>}></Route>
        </Route>
    </Routes>
    )
}