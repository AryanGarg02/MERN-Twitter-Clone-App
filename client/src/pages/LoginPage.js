import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { ALL_ROUTES } from "../util/route.util";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;

        setLoading(true);

        try {
            const data = await login({ username, password });
            localStorage.setItem("token", data.jwtToken);
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = data.jwtToken;

                return config;
            });

            // add delay
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                    navigate(ALL_ROUTES.HOME_PAGE);
                }, 1000)
            );
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <div className="vh-100" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div
                            className="card border-0"
                            style={{
                                borderRadius: "1rem",
                                boxShadow:
                                    "0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)",
                            }}
                        >
                            <div className="row g-0">
                                <div
                                    style={{
                                        borderRadius: "1rem 0 0 1rem",
                                        background: "#1D9BF0",
                                    }}
                                    className="col-md-6 col-lg-5 d-flex justify-content-center align-items-center"
                                >
                                    <div
                                        style={{ height: 550 }}
                                        className="d-flex flex-column justify-content-center align-items-center"
                                    >
                                        <h2 className="text-white pb-4">
                                            Welcome Back
                                        </h2>
                                        <img
                                            width={150}
                                            height={150}
                                            src="/images/app-logo-white.svg"
                                            alt="login form"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLogin}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <span className="h1 fw-bold mb-0">
                                                    Log in
                                                </span>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    className="form-control form-control-lg"
                                                    required
                                                    name="username"
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Password"
                                                    required
                                                    name="password"
                                                />
                                            </div>
                                            <div className="pt-1 mb-4">
                                                {!loading && (
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                                )}

                                                {loading && (
                                                    <button
                                                        disabled
                                                        className="btn btn-dark btn-lg btn-block"
                                                    >
                                                        Loading...
                                                    </button>
                                                )}
                                            </div>
                                            <p className="mb-5 pb-lg-2 text-muted">
                                                Don't have an account?{" "}
                                                <Link
                                                    to={
                                                        ALL_ROUTES.REGISTER_PAGE
                                                    }
                                                >
                                                    Register here
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
