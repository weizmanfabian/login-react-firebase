import { Route, Routes } from "react-router-dom";
import HomeApp from "../pages/HomeApp";
import Navbar from "../components/Navbar.js"
import Operarios from "../pages/Operarios";
import SignUp from "../components/SignUp";
import Gerentes from "../pages/Gerentes";

const AplicationRoute = ({ user, setUser }) => {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/home" element={<HomeApp user={user} />} />
                <Route path='/operarios' element={<Operarios />} />
                <Route path='/operarios/registrar' element={<SignUp cargoARegistrar='Operario' pathBack="/app/operarios" />} />
                <Route path='/gerentes' element={<Gerentes cargoARegistrar='Gerente' />} />
                <Route path='/gerentes/registrar' element={<SignUp cargoARegistrar='Gerente' pathBack="/app/gerentes" />} />
            </Routes>
        </>
    );
}

export default AplicationRoute;