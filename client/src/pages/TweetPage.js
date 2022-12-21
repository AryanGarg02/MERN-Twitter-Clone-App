import {
    faComment,
    faHeart,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    commentOnTweet,
    deleteTweet,
    getTweetDetails,
    likeTweet,
    postTweet,
    unlikeTweet,
} from "../api/tweetApi";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ALL_ROUTES } from "../util/route.util";
import "./Homepage.css";

export const TweetPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [tweetDetails, setTweetDetails] = useState({});
    const [showTweetDialog, setShowTweetDialog] = useState(false);
    const [tweetPost, setTweetPost] = useState("");
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);

    const [showCommentDialog, setShowCommentDialog] = useState(false);
    const [commentPost, setCommentPost] = useState("");
    const [selectedTweet, setSelectedTweet] = useState(null);

    const tweetId = params.id;

    useEffect(() => {
        if (!reload) {
            return;
        }
        fetchTweet();
        setReload(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const fetchTweet = async () => {
        setLoading(true);
        const tweets = await getTweetDetails(tweetId);
        setTweetDetails(tweets);
        setLoading(false);
    };

    const handleTweet = async () => {
        try {
            await postTweet({ content: tweetPost });
            toast.success("Tweet posted");
            setReload(true);
        } catch (err) {
            console.log(err);
        }
        setShowTweetDialog(false);
        setTweetPost("");
    };

    const handleTweetPostChange = async (e) => {
        setTweetPost(e.target.value);
    };

    const handleCommentPostChange = async (e) => {
        setCommentPost(e.target.value);
    };

    const handleLikeTweet = async (id) => {
        try {
            await likeTweet(id);
            toast.success("Tweet liked");
            setReload(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlikeTweet = async (id) => {
        try {
            await unlikeTweet(id);
            toast.success("Tweet un liked");
            setReload(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTweet = async (id) => {
        try {
            await deleteTweet(id);
            toast.success("Tweet deleted");
            setReload(true);
            navigate(ALL_ROUTES.HOME_PAGE);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentTweet = async () => {
        try {
            await commentOnTweet(selectedTweet, { content: commentPost });
            toast.success("Added comment");
            setReload(true);
            setShowCommentDialog(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleProfileClick = async (id) => {
        navigate(ALL_ROUTES.PROFILE_PAGE.replace(":id", id));
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
                <h5>Tweet</h5>
            </div>

            <div>
                <div className="tweetCard">
                    <div className="border p-2 d-flex gap-2">
                        <div>
                            <img
                                src={
                                    tweetDetails?.tweetedBy?.profilePic
                                        ? `/images/${tweetDetails?.tweetedBy?.profilePic}`
                                        : "/images/default-profile-pic.jpg"
                                }
                                className="rounded-circle"
                                width={50}
                                height={50}
                                alt="profilePic"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="d-flex justify-content-between align-items-center pb-2">
                                <div>
                                    <div
                                        className="usernameHover fw-bold"
                                        style={{ display: "inline" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProfileClick(
                                                tweetDetails?.tweetedBy?._id
                                            );
                                        }}
                                    >
                                        @{tweetDetails?.tweetedBy?.username}
                                    </div>{" "}
                                    -{" "}
                                    <span className="float text-muted fs-6">
                                        {new Date(
                                            tweetDetails.createdAt
                                        ).toDateString()}
                                    </span>
                                </div>
                                {tweetDetails.tweetedBy._id ===
                                    jwtDecode(localStorage.getItem("token"))
                                        ._id && (
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTweet(tweetDetails._id);
                                        }}
                                    >
                                        <button className="btn hover-btn">
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="pb-1">{tweetDetails.content}</div>

                            <div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        tweetDetails.likes.find(
                                            (like) =>
                                                like._id ===
                                                jwtDecode(
                                                    localStorage.getItem(
                                                        "token"
                                                    )
                                                )?._id
                                        )
                                            ? handleUnlikeTweet(
                                                  tweetDetails._id
                                              )
                                            : handleLikeTweet(tweetDetails._id);
                                    }}
                                    className="btn hover-btn d-inline-flex gap-2 align-items-center"
                                >
                                    <FontAwesomeIcon
                                        className="text-danger"
                                        icon={
                                            tweetDetails.likes.find(
                                                (like) =>
                                                    like._id ===
                                                    jwtDecode(
                                                        localStorage.getItem(
                                                            "token"
                                                        )
                                                    )?._id
                                            )
                                                ? faHeartSolid
                                                : faHeart
                                        }
                                    />
                                    {tweetDetails.likes.length}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTweet(tweetDetails._id);
                                        setShowCommentDialog(true);
                                    }}
                                    className="btn hover-btn d-inline-flex gap-2 align-items-center"
                                >
                                    <FontAwesomeIcon
                                        className="text-primary"
                                        icon={faComment}
                                    />
                                    {tweetDetails.comments.length}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 mb-3">
                <h6>Comments</h6>
                {tweetDetails.comments.map((comment, index) => (
                    <div key={index}>
                        <div>
                            <div className="border-bottom p-2 d-flex gap-2">
                                <div>
                                    <img
                                        src={
                                            comment?.commentedBy?.profilePic
                                                ? `/images/${comment?.commentedBy?.profilePic}`
                                                : "/images/default-profile-pic.jpg"
                                        }
                                        className="rounded-circle"
                                        width={50}
                                        height={50}
                                        alt="profilePic"
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="d-flex justify-content-between align-items-center pb-2">
                                        <div>
                                            <div
                                                className="usernameHover fw-bold"
                                                style={{ display: "inline" }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProfileClick(
                                                        comment?.commentedBy
                                                            ?.tweetedBy?._id
                                                    );
                                                }}
                                            >
                                                @
                                                {comment?.commentedBy?.username}
                                            </div>{" "}
                                            -{" "}
                                            <span className="float text-muted fs-6">
                                                {new Date(
                                                    comment.commentedAt
                                                ).toDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pb-1">
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                show={showTweetDialog}
                onHide={() => setShowTweetDialog(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Tweet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Control
                                as="textarea"
                                rows={4}
                                onChange={handleTweetPostChange}
                                placeholder="Write your tweet"
                                autoFocus
                                value={tweetPost}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowTweetDialog(false);
                            setTweetPost("");
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleTweet();
                        }}
                    >
                        Tweet
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showCommentDialog}
                onHide={() => setShowCommentDialog(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comment On Tweet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={4}
                                onChange={handleCommentPostChange}
                                placeholder="Add your comment"
                                autoFocus
                                value={commentPost}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCommentDialog(false);
                            setCommentPost("");
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleCommentTweet();
                        }}
                    >
                        Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
