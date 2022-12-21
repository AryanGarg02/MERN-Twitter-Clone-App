import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faRightFromBracket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ALL_ROUTES } from "../util/route.util";
import jwt_decode from "jwt-decode";
import { Modal, Button } from "react-bootstrap";

export const SideBar = () => {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currUserId = jwt_decode(
        localStorage.getItem("token").toString()
    )?._id;

    return (
        <div
            style={{
                borderRight: "1px solid rgb(225 228 229)",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            className="h-100"
        >
            <div>
                <div style={{ paddingLeft: 8, marginBottom: 20 }}>
                    <img
                        width={40}
                        height={40}
                        src="/images/app-logo.svg"
                        alt="Logo"
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: 15,
                        padding: "8px 12px",
                        borderRadius: 23,
                        marginBottom: 10,
                    }}
                    className={`link-active ${
                        location.pathname === ALL_ROUTES.HOME_PAGE && "active"
                    }`}
                    onClick={() => navigate(ALL_ROUTES.HOME_PAGE)}
                >
                    <FontAwesomeIcon icon={faHouse} size="lg" />
                    <h4 style={{ fontWeight: 400, margin: 0 }}>Home</h4>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: 15,
                        padding: "8px 12px",
                        borderRadius: 23,
                        marginBottom: 10,
                    }}
                    className={`link-active ${
                        location.pathname === ALL_ROUTES.PROFILE_PAGE &&
                        "active"
                    }`}
                    onClick={() =>
                        navigate(
                            ALL_ROUTES.PROFILE_PAGE.replace(":id", currUserId)
                        )
                    }
                >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                    <h4 style={{ fontWeight: 400, margin: 0 }}>Profile</h4>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: 15,
                        padding: "8px 12px",
                        borderRadius: 23,
                        marginBottom: 10,
                    }}
                    className={`link-active ${
                        location.pathname === ALL_ROUTES.LOGOUT_PAGE && "active"
                    }`}
                    onClick={() => setShow(true)}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                    <h4 style={{ fontWeight: 400, margin: 0 }}>Logout</h4>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    borderRadius: 23,
                    gap: 10,
                }}
                className="link-active"
                onClick={() =>
                    navigate(
                        ALL_ROUTES.PROFILE_PAGE.replace(":/id", currUserId)
                    )
                }
            >
                <img
                    width={40}
                    height={40}
                    className="rounded-circle"
                    src="/images/default-profile-pic.jpg"
                    alt="profilePic"
                    style={{ marginLeft: 10 }}
                />
                <div>
                    <h4 className="m-0">Jayesh</h4>
                    <span>@jayesh</span>
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            navigate(ALL_ROUTES.LOGOUT_PAGE);
                            setShow(false);
                        }}
                    >
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
