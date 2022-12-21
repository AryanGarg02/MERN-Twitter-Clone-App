import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ALL_ROUTES } from "../util/route.util";

export const LogoutPage = () => {
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = "";

            return config;
        });

        setTimeout(() => setReady(true), 1000);
    }, []);

    useEffect(() => {
        if (ready) {
            toast("Logged out");
            navigate(ALL_ROUTES.LOGIN_PAGE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    return null;
};
