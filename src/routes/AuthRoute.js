import { Route, Routes } from 'react-router-dom'
import Login from "../pages/Login";
import SignUp from '../components/SignUp';
import Operarios from '../pages/Operarios';
//si no se loguea el usuario
const AuthRoute = ({ setUser }) => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                
            </Routes>
        </div>
    );
}

export default AuthRoute;