import { Route, Routes } from "react-router-dom";
import HomeApp from "../pages/HomeApp";
import Navbar from "../components/Navbar.js"
import SignUp from "../components/SignUp";
import Gerente from "../pages/Gerentes";
import Operario from "../pages/Operarios"
import { useState } from "react";

const AplicationRoute = ({ user, setUser }) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/home" element={<HomeApp user={user} />} />
                <Route path='/operarios' element={<Operario cargoARegistrar='Operario' />} />
                <Route path='/operarios/addEdit' element={<SignUp cargoARegistrar='Operario' pathBack="/app/operarios" />} />
                <Route path='/operarios/addEdit/:id' element={<SignUp cargoARegistrar='Operario' pathBack="/app/operarios" />} />
                <Route path='/gerentes' element={<Gerente cargoARegistrar='Gerente' />} />
                <Route path='/gerentes/addEdit' element={<SignUp cargoARegistrar='Gerente' pathBack="/app/gerentes" />} />
                <Route path='/gerentes/addEdit/:id' element={<SignUp cargoARegistrar='Gerente' pathBack="/app/gerentes" />} />
            </Routes>
        </>
    );
}

export default AplicationRoute;