import "../../App.css"
import Sidebar from "../Sidebar/Sidebar";
import Tweet from "../Tweets/Feed/Feed";
import Trending from "../Trending/Trending";
import CreateTweet from "../Tweets/NewTweet/CreateTweet";

const Home = () => {

    return (
        <div className="container">
            <div className="flex-item">
                <Sidebar/>
                <div>
                    <CreateTweet/>
                    <Tweet/>
                </div>
                <div className="flex-item">
                    <Trending/>
                </div>
            </div>
        </div>
    )
}

export default Home;