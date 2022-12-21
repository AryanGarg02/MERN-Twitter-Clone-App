import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { AppRouter } from "./routes/AppRoute";
import { AuthRouter } from "./routes/AuthRoute";

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem("token");

    return config;
});

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            window.location.pathname = "/logout";
        }
        const backendError = error.response.data?.message;
        console.log("error");
        if (backendError) {
            toast.error(backendError);
        }

        return Promise.reject(error);
    }
);

export const App = () => {
    const location = useLocation();

    const hasJWT = () => {
        //check user has JWT token
        if (localStorage.getItem("token")) {
            return true;
        }

        return false;
    };

    const [loggedIn, setLoggedIn] = useState(hasJWT());

    useEffect(() => {
        if (hasJWT()) {
            setLoggedIn(true);

            return;
        }

        setLoggedIn(false);
    }, [location.pathname]);

    return (
        <>
            {loggedIn && (
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row h-100">
                        <div className="col-3">
                            <SideBar />
                        </div>
                        <div className="col-7">
                            <AppRouter />
                        </div>
                    </div>
                </div>
            )}

            {!loggedIn && <AuthRouter />}

            <ToastContainer autoClose={4000} />
        </>
    );
};
