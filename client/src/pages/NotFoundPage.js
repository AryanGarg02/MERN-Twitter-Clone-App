import React from "react";
import { useNavigate } from "react-router-dom";
import { ALL_ROUTES } from "../util/route.util";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleHomePageClick = () => {
        navigate(ALL_ROUTES.HOME_PAGE);
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <div>
                <h2>The page you are looking for does not exist</h2>

                <button
                    className="btn btn-default"
                    style={{ display: "flex", margin: "auto" }}
                    onClick={handleHomePageClick}
                >
                    Back to home page
                </button>
            </div>
        </div>
    );
};
