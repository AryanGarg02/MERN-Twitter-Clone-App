import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LogoutPage } from "../pages/LogoutPage";
import { ProfilePage } from "../pages/ProfilePage";
import { TweetPage } from "../pages/TweetPage";
import { ALL_ROUTES } from "../util/route.util";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path={ALL_ROUTES.HOME_PAGE} element={<HomePage />} />
            <Route path={ALL_ROUTES.PROFILE_PAGE} element={<ProfilePage />} />
            <Route path={ALL_ROUTES.TWEET_PAGE} element={<TweetPage />} />
            <Route path={ALL_ROUTES.LOGOUT_PAGE} element={<LogoutPage />} />

            <Route path="*" element={<Navigate to={ALL_ROUTES.HOME_PAGE} />} />
        </Routes>
    );
};
