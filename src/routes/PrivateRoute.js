import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLogged, children }) => {
    return isLogged ? children : <Navigate to="/auth/login" />

}

export default PrivateRoute;