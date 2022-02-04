import {useEffect, useState} from "react";
import "./Feed.css"
import '../../../App.css'
import axios from "axios";
import checkmark from "../../../Assets/checkmark.png"
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import {useParams, useNavigate} from "react-router-dom";

const TweetFeed = () => {
    const [users, setUsers] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [userImg, setUserImg] = useState([]);
    const [tweetInput, setTweetInput] = useState("");

    let url = 'https://localhost:7222/api/';
    let tweetsUrl = 'tweets/';
    let usersUrl = 'users/';

    let navigate = useNavigate();
    let {id} = useParams();

    const getAllUsers = async () => {
        try {
            const response = await axios.get(url + usersUrl);
            setUsers(response.data);
        } catch (e) {
            console.warn(e);
        }
    }

    //Hardcoded user to tweet from
    const getUser = async () => {
        try {
            const response = await axios.get(url + usersUrl + 1);
            setUserImg(response.data.profileImgUrl);
        } catch (e) {
            console.warn(e)
        }

    }

    const tweetHandler = (event) => {
        setTweetInput(event.target.value)
    }

    const postTweet = async (e) => {
        e.preventDefault()
        try {
            const response = await axios({
                method: 'put',
                url: url + usersUrl + 1,
                data: {
                    id: 1,
                    userName: "gummi",
                    handle: "@gummi",
                    profileImgUrl: "https://pbs.twimg.com/media/C8SFjSZXsAQFg3L.jpg",
                    tweets: [
                        {
                            tweetContent: tweetInput,
                            likes: 0,
                            retweets: 0,
                            timestamp: "0001-01-01T00:00:00",
                            comments: []
                        }
                    ]
                }
            })
            setTweetInput("")
            getAllUsers()
        } catch (e) {
            console.warn(e)

        }

    }

    const getCommentCount = async () => {
        try {
            const answer = await axios.get(url + tweetsUrl);
            let numb = 0;
            for (let usersKey in answer.data) {
                for (let tweetedKey in answer.data[usersKey]) {
                    console.log("anwe",answer.data[usersKey].comments[tweetedKey])
                    setCommentCount(numb + 1)
                }
            }
        } catch (e) {
            console.warn(e)
        }

    }

    const countLikes = async (Id, content, timestamp, like) => {
        let likeCount = like + 1;
        try {
            const response = await axios({
                method: 'put',
                url: url + tweetsUrl + Id,
                data: {
                    id: Id,
                    tweetContent: content,
                    likes: likeCount,
                    timestamp: timestamp,
                    comments: []
                }
            })
            getAllUsers();
        } catch (e) {
            console.warn(e)
        }

    }


    useEffect(() => {
        getUser()
        getCommentCount();
        getAllUsers();

    }, [])

    return (
        <div>
            <div className="create-tweet-container">
                <div className="flex-item">
                    <h4 className="title">Home</h4>
                </div>
                <form>
                    <div className="flex-item">
                        <img src={userImg} alt="profile" className="profile-img"/>

                        <input id="tweetId" type="text" className="tweet-input" placeholder="What´s Happening?"
                               onChange={tweetHandler}/>
                    </div>
                    <div className="flex-item">
                        <PublicOutlinedIcon color="primary" className="globe-icon" fontSize="small"/>
                        <p className="dummy-text">Everyone can reply</p>
                    </div>
                    <hr className="divider"/>
                    <div className="flex-item">
                        <ImageOutlinedIcon color="primary" className="icon-left" fontSize="small"/>
                        <GifBoxOutlinedIcon color="primary" className="icon-middle" fontSize="small"/>
                        <PollOutlinedIcon color="primary" className="icon-middle" fontSize="small"/>
                        <SentimentSatisfiedOutlinedIcon color="primary" className="icon-middle" fontSize="small"/>
                        <DateRangeOutlinedIcon color="primary" className="icon-middle" fontSize="small"/>
                        <LocationOnOutlinedIcon color="primary" className="icon-right" fontSize="small"/>
                        <button className="create-tweet" onClick={postTweet}>Tweet</button>
                    </div>
                </form>
            </div>
            {users.map((user) => (
                <div>
                    {user.tweets.slice().reverse().map((tweet) => (
                        <div>
                            <div className="tweet-container">
                                <div onClick={() => navigate('/tweet/' + tweet.id)}>
                                    <div className="flex-item">
                                        <img className="profile-img" src={user.profileImgUrl} alt="profilePic"/>
                                        <p className="username">{user.userName}</p>
                                        <img className="checkmark" alt="verified" src={checkmark}/>
                                        <p className="handle">{user.handle}</p>
                                        <p className="timestamp">{tweet.timestamp}</p>
                                    </div>
                                    <div className="flex-item">
                                        <p className="tweet">{tweet.tweetContent}</p>
                                    </div>
                                </div>
                                <div className="flex-item">
                                    <CommentIcon className="icons"/>
                                    <p className="comment-counter">{commentCount}</p>
                                    <LikeIcon className="icons"
                                              onClick={() => countLikes(tweet.id, tweet.tweetContent, tweet.timestamp, tweet.likes)}/>
                                    <p className="like-counter">{tweet.likes}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TweetFeed;