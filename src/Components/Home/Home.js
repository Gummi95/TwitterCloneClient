import "../../App.css"
import Sidebar from "../Sidebar/Sidebar";
import Tweet from "../Tweets/Feed/Feed";
import Trending from "../Trending/Trending";

const Home = () => {

    return (
        <div className="container">
            <div className="flex-item">
                <Sidebar/>
                <div>
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