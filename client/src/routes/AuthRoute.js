import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ALL_ROUTES } from "../util/route.util";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path={ALL_ROUTES.LOGIN_PAGE} element={<LoginPage />} />
            <Route path={ALL_ROUTES.REGISTER_PAGE} element={<RegisterPage />} />

            <Route path="*" element={<Navigate to={ALL_ROUTES.LOGIN_PAGE} />} />
        </Routes>
    );
};
