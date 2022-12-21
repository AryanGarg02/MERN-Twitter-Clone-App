import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
    faCakeCandles,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editUser, uploadUserProfile } from "../api/userProfile";

import { followUser, getUserDetails, unFollowUser } from "../api/userProfile";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { formatDateForUI } from "../util/date.util";

const defaultUserEditProfile = {
    location: "",
    dateOfBirth: "",
    name: "",
};

export const ProfilePage = () => {
    const [profileDetails, setProfileDetails] = useState({});
    const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);

    const [editProfileDetails, setEditProfileDetails] = useState(
        defaultUserEditProfile
    );
    const params = useParams();
    const [showProfilePicEditDialog, setShowProfilePicDialog] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (!params.id) {
            return;
        }

        setReload(true);
    }, [params.id]);

    useEffect(() => {
        if (!reload) {
            return;
        }
        fetchProfileDetails();
        setReload(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const fetchProfileDetails = async () => {
        setLoading(true);
        const profileDetails = await getUserDetails(params.id);
        setProfileDetails(profileDetails);
        setLoading(false);
    };

    const handleFollow = async () => {
        try {
            await followUser(params.id);
            toast.success("Followed User");
            setReload(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0]);
        let image_as_files = e.target.files[0];

        setImagePreview(image_as_base64);
        setImageFile(image_as_files);
    };

    const handleUnfollow = async () => {
        try {
            await unFollowUser(params.id);
            toast.success("UnFollowed User");
            setReload(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditProfile = async () => {
        try {
            await editUser(params.id, editProfileDetails);
            toast.success("Profile edited");
            setEditProfileDetails(defaultUserEditProfile);
            setShowEditProfileDialog(false);
            setReload(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUploadProfilePic = async () => {
        let formData = new FormData();
        formData.append("profilePic", imageFile);

        try {
            await uploadUserProfile(params.id, formData);
            toast.success("Profile Pic Uploaded");
            setShowProfilePicDialog(false);
            setImageFile(null);
            setImagePreview("");
            setReload(true);
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <div
            className="pt-3 pb-3"
            style={{ height: "100vh", overflow: "scroll", paddingRight: 20 }}
        >
            <div className="d-flex pb-3 align-items-center justify-content-between">
                <h5>Profile</h5>
            </div>
            <div style={{ background: "#1D9BF0", height: 200 }}>
                <img
                    className="rounded-circle"
                    width={150}
                    height={150}
                    style={{
                        position: "relative",
                        top: 130,
                        left: 25,
                        border: "1px solid lightgray",
                    }}
                    src={
                        profileDetails?.profilePic
                            ? `/images/${profileDetails?.profilePic}`
                            : "/images/default-profile-pic.jpg"
                    }
                    alt="profile"
                />
            </div>

            <div className="d-flex justify-content-end gap-2 p-3 mb-3">
                {profileDetails._id ===
                    jwtDecode(localStorage.getItem("token"))?._id && (
                    <>
                        <Button
                            variant="outline-primary"
                            onClick={() => setShowProfilePicDialog(true)}
                        >
                            Upload Profile Photo
                        </Button>
                        <Button
                            onClick={() => {
                                setShowEditProfileDialog(true);
                                setEditProfileDetails({
                                    name: profileDetails.name,
                                    location: profileDetails.location,
                                    dateOfBirth: formatDateForUI(
                                        profileDetails.dateOfBirth
                                    ),
                                });
                            }}
                            variant="outline-dark"
                        >
                            Edit
                        </Button>
                    </>
                )}

                {profileDetails._id !==
                    jwtDecode(localStorage.getItem("token"))?._id && (
                    <div>
                        {!profileDetails.followers.find(
                            (follower) =>
                                follower._id ===
                                jwtDecode(localStorage.getItem("token"))?._id
                        ) && (
                            <Button variant="dark" onClick={handleFollow}>
                                Follow
                            </Button>
                        )}
                    </div>
                )}

                {profileDetails.followers.find(
                    (follower) =>
                        follower._id ===
                        jwtDecode(localStorage.getItem("token"))?._id
                ) && (
                    <Button variant="dark" onClick={handleUnfollow}>
                        UnFollow
                    </Button>
                )}
            </div>
            <div className="p-3 mb-1">
                <div>
                    <h5>{profileDetails.name}</h5>
                    <p className="text-muted">@{profileDetails.username}</p>
                </div>

                <div className="d-flex mt-4 mb-1 gap-5">
                    {profileDetails.dateOfBirth && (
                        <div className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faCakeCandles} />
                            <p className="text-muted m-0">
                                Dob,{" "}
                                {new Date(
                                    profileDetails.dateOfBirth
                                ).toDateString()}
                            </p>
                        </div>
                    )}

                    {profileDetails.location && (
                        <div className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p className="text-muted m-0">
                                Location, {profileDetails.location}
                            </p>
                        </div>
                    )}
                </div>

                <div className="d-flex">
                    <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} />
                        <p className="text-muted m-0">
                            Joined{" "}
                            {new Date(profileDetails.createdAt).toDateString()}
                        </p>
                    </div>
                </div>

                <div className="d-flex mt-4">
                    <div className="d-flex align-items-center gap-3">
                        <strong>{`${profileDetails.following.length} Following`}</strong>
                        <strong>{`${profileDetails.followers.length} Followers`}</strong>
                    </div>
                </div>
            </div>

            <Modal
                show={showEditProfileDialog}
                onHide={() => {
                    setShowEditProfileDialog(false);
                    setEditProfileDetails(defaultUserEditProfile);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    setEditProfileDetails((value) => ({
                                        ...value,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Name"
                                autoFocus
                                value={editProfileDetails.name}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    setEditProfileDetails((value) => ({
                                        ...value,
                                        location: e.target.value,
                                    }))
                                }
                                placeholder="Location"
                                autoFocus
                                value={editProfileDetails.location}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setEditProfileDetails((value) => ({
                                        ...value,
                                        dateOfBirth: e.target.value,
                                    }));
                                }}
                                placeholder="Date Of Birth"
                                autoFocus
                                value={editProfileDetails.dateOfBirth}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowEditProfileDialog(false);
                            setEditProfileDetails(defaultUserEditProfile);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleEditProfile();
                        }}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showProfilePicEditDialog}
                onHide={() => setShowProfilePicDialog(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Profile Pic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-primary small" role="alert">
                        Note: The image should be square in shape
                    </div>
                    <Form encType="multipart/formData">
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="profilePic"
                                type="file"
                                accept=".jpeg,.jpg,.png"
                                autoFocus
                                onChange={handleImagePreview}
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        {imagePreview && (
                            <img src={imagePreview} alt="img" width="100%" />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowProfilePicDialog(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleUploadProfilePic();
                        }}
                    >
                        Save Profile Pic
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
