import {useEffect, useState} from "react";
import "./Feed.css"
import '../../../App.css'
import axios from "axios";
import checkmark from "../../../Assets/checkmark.png"
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import OpenTweet from "../OpenTweet/OpenTweet";
import {useParams, useNavigate} from "react-router-dom";

const TweetFeed = () => {
    const [users, setUsers] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

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

    const getComments = async () => {
        try {
            const answer = await axios.get(url + tweetsUrl);
            let numb = 0;
            for (let usersKey in answer.data) {
                for (let tweetedKey in answer[usersKey]) {
                    console.log(answer)
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
        getComments();
        getAllUsers();

    }, [])

    return (
        <div>
            {users.map((user) => (
                <div>
                    {user.tweets.map((tweet) => (
                        <div>
                            <div className="tweet-container" >
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
                                    <p className="comment-counter">{tweet.commentCount}</p>
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