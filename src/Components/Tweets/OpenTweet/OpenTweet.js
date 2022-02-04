import './OpenTweet.css'
import '../../../App.css'
import Trending from '../../Trending/Trending'
import Sidebar from "../../Sidebar/Sidebar";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import Checkmark from '../../../Assets/checkmark.png'
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IosShareIcon from '@mui/icons-material/IosShare';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {useMediaQuery} from "@mui/material";

const OpenTweet = () => {
    const [tweet, setTweet] = useState([]);
    const [user, setUser] = useState([]);
    const [commentUserId, setCommentUserId] = useState([]);
    const [quoteTweets, setQuoteTweets] = useState(0);
    const [comment, setComment] = useState([]);

    let url = 'https://localhost:7222/api/';
    let tweetsUrl = 'tweets/';
    let usersUrl = 'users/';
    let commentUrl = 'comments'
    let {id} = useParams();

    const getUsers = async () => {
        try {
            const response = await axios.get(url + usersUrl);
            let temp = response.data;
            for (let users in temp) {
                for (let index in temp[users].tweets) {
                    let numb = temp[users].tweets[index].id;
                    if (numb == id) {
                        getUserById(temp[users].id);
                    }
                }
            }
        } catch (e) {
            console.warn(e)
        }

    }

    const getUserById = async (userId) => {
        try {
            const response = await axios.get(url + usersUrl + userId);
            setUser(response.data);
        } catch (e) {
            console.warn(e)
        }
    }

    const getTweetByID = async (id) => {
        let userList = []
        try {
            const response = await axios.get(url + tweetsUrl + id);
            setTweet(response.data);
            setComment(response.data.comments)
            for (let comments in comment) {
                const answer = await axios.get(url + usersUrl + comment[comments].userId)
                userList.push(answer.data)
            }
            setCommentUserId(userList);
        } catch (e) {
            console.warn(e)
        }

    }

    const countLikes = async (id) => {
        let likeCount = tweet.likes + 1;
        try {
            const response = await axios({
                method: 'put',
                url: url + tweetsUrl + id,
                data: {
                    id: id,
                    tweetContent: tweet.tweetContent,
                    likes: likeCount,
                    retweets: tweet.retweets,
                    timestamp: tweet.timestamp,
                    comments: []
                }
            })
        } catch (e) {
            console.warn(e)
        }
        getTweetByID(id)
    }

    const countRetweets = async (id) => {
        let retweetsCount = tweet.retweets + 1;
        try {
            const response = await axios({
                method: 'put',
                url: url + tweetsUrl + id,
                data: {
                    id: id,
                    tweetContent: tweet.tweetContent,
                    likes: tweet.likes,
                    retweets: retweetsCount,
                    timestamp: tweet.timestamp,
                    comments: []
                }
            })
        } catch (e) {
            console.warn(e)
        }
        getTweetByID(id)
    }

    const generateQuoteTweetsNumber = () => {
        let max = 369;
        let min = 3;
        setQuoteTweets(Math.floor(Math.random() * (max - min) + min));
    }

    useEffect(() => {
        getTweetByID(id);
        getUsers();
        generateQuoteTweetsNumber();

    }, [])
    return (
        <div className="container">
            <div className="flex-item">
                <Sidebar/>
                <div className="open-tweet-container">
                    <div className="upper-section">
                        <div className="flex-item">
                            <img src={user.profileImgUrl} alt="" className="profile-img"/>
                            <div className="col">
                                <p className="username" id="open-tweet-username">{user.userName}</p>
                                <p className="handle" id="open-tweet-handle">{user.handle}</p>
                            </div>
                            <img src={Checkmark} alt="" className="checkmark"/>
                        </div>

                        <div className="flex-item">
                            <p className="tweet">{tweet.tweetContent}</p>
                        </div>
                        <div className="flex-item">
                            <p className="timestamp">{tweet.timestamp}</p>
                        </div>
                        <hr className="dividers"/>
                        <div className="flex-item">
                            <p className="count" id="count-right">{tweet.retweets}</p>
                            <p className="text">Retweets</p>
                            <p className="count">{quoteTweets}</p>
                            <p className="text">Quote Tweets</p>
                            <p className="count">{tweet.likes}</p>
                            <p className="text">Likes</p>
                        </div>
                        <hr className="dividers"/>
                        <div className="flex-item">
                            <CommentIcon id="icon_left" className="icon"/>
                            <AutorenewIcon className="icon" onClick={() => countRetweets(tweet.id)}/>
                            <LikeIcon className="icon" onClick={() => countLikes(tweet.id)}/>
                            <IosShareIcon className="icon"/>
                        </div>
                    </div>
                    {comment.map(comments => (
                        <div>

                                <div className="comment-container">
                                    <div className="flex-item">
                                        <img src={user.profileImgUrl} alt="" className="profile-img"/>
                                        <div className="col">
                                            <p className="username" id="open-tweet-username">{user.userName}</p>
                                            <p className="handle" id="open-tweet-handle">{user.handle}</p>
                                        </div>
                                        <img src={Checkmark} alt="" className="checkmark"/>
                                    </div>
                                    <p className="tweet">{comments.content}</p>
                                    <div className="flex-item">
                                        <p className="timestamp">{comments.timestamp}</p>
                                    </div>
                                    <div className="flex-item">
                                        <CommentIcon id="icon_left" className="icon"/>
                                        <AutorenewIcon className="icon"/>
                                        <LikeIcon className="icon"/>
                                        <IosShareIcon className="icon"/>
                                    </div>
                                </div>

                        </div>
                    ))}
                </div>
                <div className="flex-item">
                    <Trending/>
                </div>
            </div>
        </div>
    )
}

export default OpenTweet;