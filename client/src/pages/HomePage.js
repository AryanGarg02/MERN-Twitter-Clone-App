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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    commentOnTweet,
    deleteTweet,
    getAllTweets,
    likeTweet,
    postTweet,
    unlikeTweet,
} from "../api/tweetApi";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ALL_ROUTES } from "../util/route.util";
import "./Homepage.css";

export const HomePage = () => {
    const navigate = useNavigate();
    const [tweets, setTweets] = useState([]);
    const [showTweetDialog, setShowTweetDialog] = useState(false);
    const [tweetPost, setTweetPost] = useState("");
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);

    const [showCommentDialog, setShowCommentDialog] = useState(false);
    const [commentPost, setCommentPost] = useState("");
    const [selectedTweet, setSelectedTweet] = useState(null);

    useEffect(() => {
        if (!reload) {
            return;
        }
        fetchAllTweets();
        setReload(false);
    }, [reload]);

    const fetchAllTweets = async () => {
        setLoading(true);
        const tweets = await getAllTweets();
        setTweets(tweets);
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

    const handleTweetClick = async (id) => {
        navigate(ALL_ROUTES.TWEET_PAGE.replace(":id", id));
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
                <h5>Home</h5>
                <Button
                    style={{
                        width: 150,
                        border: 0,
                        background: "rgb(29, 155, 240)",
                    }}
                    onClick={() => setShowTweetDialog(true)}
                >
                    Tweet
                </Button>
            </div>

            <div>
                {tweets.map((tweet, index) => (
                    <div
                        className="tweetCard"
                        key={index}
                        onClick={() => handleTweetClick(tweet._id)}
                    >
                        <div className="border p-2 d-flex gap-2">
                            <div>
                                <img
                                    src={
                                        tweet?.tweetedBy?.profilePic
                                            ? `/images/${tweet?.tweetedBy?.profilePic}`
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
                                                    tweet?.tweetedBy?._id
                                                );
                                            }}
                                        >
                                            @{tweet?.tweetedBy?.username}
                                        </div>{" "}
                                        -{" "}
                                        <span className="float text-muted fs-6">
                                            {new Date(
                                                tweet.createdAt
                                            ).toDateString()}
                                        </span>
                                    </div>
                                    {tweet.tweetedBy._id ===
                                        jwtDecode(localStorage.getItem("token"))
                                            ._id && (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteTweet(tweet._id);
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

                                <div className="pb-1">{tweet.content}</div>

                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            tweet.likes.find(
                                                (like) =>
                                                    like._id ===
                                                    jwtDecode(
                                                        localStorage.getItem(
                                                            "token"
                                                        )
                                                    )?._id
                                            )
                                                ? handleUnlikeTweet(tweet._id)
                                                : handleLikeTweet(tweet._id);
                                        }}
                                        className="btn hover-btn d-inline-flex gap-2 align-items-center"
                                    >
                                        <FontAwesomeIcon
                                            className="text-danger"
                                            icon={
                                                tweet.likes.find(
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
                                        {tweet.likes.length}
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTweet(tweet._id);
                                            setShowCommentDialog(true);
                                        }}
                                        className="btn hover-btn d-inline-flex gap-2 align-items-center"
                                    >
                                        <FontAwesomeIcon
                                            className="text-primary"
                                            icon={faComment}
                                        />
                                        {tweet.comments.length}
                                    </button>
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
