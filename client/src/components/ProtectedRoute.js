import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? (flag = true) : (flag = false);

        return flag;
    }

    if (!hasJWT) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};
