import "../Feed/Feed.css"
import axios from "axios";
import './CreateTweet.css';
import '../../../App.css'
import {useEffect, useState} from "react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

const CreateTweet = () => {
    const [userImg, setUserImg] = useState([]);
    const [tweetInput, setTweetInput] = useState("");
    let url = 'https://localhost:7222/api/';
    let userUrl = 'users/1'
    let tweetUrl = 'tweets/';

    //Hardcoded user to tweet from
    const getUser = async () => {
        try {
            const response = await axios.get(url + userUrl);
            setUserImg(response.data.profileImgUrl);
        } catch (e) {
            console.warn(e)
        }

    }

    const tweetHandler = (event) => {
        setTweetInput(event.target.value)
    }

    const postTweet = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: url + userUrl,
                data: {
                    id: 1,
                    userName: "gummi",
                    handle: "@gummi",
                    profileImgUrl: "https://pbs.twimg.com/media/C8SFjSZXsAQFg3L.jpg",
                    tweets: [
                        {
                            id: 1,
                            tweetContent: "test2",
                            likes: 118,
                            retweets: 0,
                            timestamp: "0001-01-01T00:00:00",
                            comments: []

                        }
                    ]
                }
            })
            console.log(response)
        } catch (e) {
            console.warn(e)

        }

    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="create-tweet-container">
            <div className="flex-item">
                <h4 className="title">Home</h4>
            </div>
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
        </div>
    )
}

export default CreateTweet;