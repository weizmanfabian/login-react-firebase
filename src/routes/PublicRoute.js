import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isLogged }) => {
    return isLogged ? <Navigate to="/app/operarios" /> : children
}

export default PublicRoute;