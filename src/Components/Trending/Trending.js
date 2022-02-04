import '../../App.css'
import './Trending.css'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useEffect, useState} from "react";
import axios from "axios";

const Trending = () => {
    const [userA, setUserA] = useState([]);
    const [userB, setUserB] = useState([]);

    //users to display in the "who to follow section"
    const getUserA = async () => {
        const response = await axios.get("https://localhost:7222/api/users/2");
        setUserA(response.data);
    };
    const getUserB = async () => {
        const response = await axios.get("https://localhost:7222/api/users/3");
        setUserB(response.data);
    };

    useEffect(() => {
        getUserA();
        getUserB();

    }, [])
    return (
        <div className="trending-container">
            <div className="flex-item">
                <input id="search" type="search" placeholder="Search Twitter" className="search-bar"/>
            </div>
            <div className="trending-row__top">
                <h4 className="trending-title">Trends for you</h4>
                <SettingsOutlinedIcon className="trending-icon"/>
            </div>
            <div className="trending-row__middle">
                <p>Politics · Trending</p>
                <MoreHorizOutlinedIcon className="trending-icon__middle"/>
            </div>
            <div className="trending-row__middle">
                <p className="covid">Covid</p>
            </div>
            <div className="trending-row__middle">
                <p>2.44m Tweets</p>
            </div>
            <div className="trending-row__lower">
                <nav>Show more</nav>
            </div>
            <div className="row">
                <div className="trending-row__top">
                    <h4 className="trending-title">Who to follow</h4>
                </div>
            </div>
            <div className="trending-row__middle">
                <img src={userA.profileImgUrl} alt="profielImg" className="profile-img"/>
                <p className="profile-name">{userA.userName}</p>
                <button className="follow-btn">Follow</button>
            </div>
            <div className="trending-row__middle">
                <img src={userB.profileImgUrl} alt="profielImg" className="profile-img"/>
                <p className="profile-name__lower">{userB.userName}</p>
                <button className="follow-btn">Follow</button>
            </div>
            <div className="trending-row__lower">
                <nav>Show more</nav>
            </div>
        </div>
    )
}

export default Trending;