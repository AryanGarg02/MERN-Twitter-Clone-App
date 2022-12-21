import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ALL_ROUTES } from "../util/route.util";
import { toast } from "react-toastify";
import { register } from "../api/authApi";

export const RegisterPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const username = e.target[2].value;
        const password = e.target[3].value;

        try {
            await register({ name, email, username, password });
            toast.success("Registration successful, please login to continue.");
            navigate(ALL_ROUTES.LOGIN_PAGE);
        } catch (err) {
            console.log(err);
        }
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
                                            Join Us
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
                                                    Register
                                                </span>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    className="form-control form-control-lg"
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    className="form-control form-control-lg"
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    className="form-control form-control-lg"
                                                    required
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <p className="mb-5 pb-lg-2 text-muted">
                                                Already Registered?{" "}
                                                <Link
                                                    to={ALL_ROUTES.LOGIN_PAGE}
                                                >
                                                    Login here
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
