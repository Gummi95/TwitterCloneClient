import "./Sidebar.css"
import "../../App.css"
import TwitterLogo from "../../Assets/tweet.png"
import NewTweet from '../../Assets/newtweet.png'
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-row">
                <img className="logo" src={TwitterLogo} alt="dummyHome"/>
            </div>
            <div className="sidebar-row">
                <HomeIcon fontSize="large"/>
                <p>Home</p>
            </div>
            <div className="sidebar-row">
                <TagIcon fontSize="large"/>
                <p>Explore</p>
            </div>
            <div className="sidebar-row">
                <NotificationsNoneIcon fontSize="large"/>
                <p>Notifications</p>
            </div>
            <div className="sidebar-row">
                <MailOutlineIcon fontSize="large"/>
                <p>Messages</p>
            </div>
            <div className="sidebar-row">
                <BookmarkBorderIcon fontSize="large"/>
                <p>Bookmarks</p>
            </div>
            <div className="sidebar-row">
                <ListAltOutlinedIcon fontSize="large"/>
                <p>Lists</p>
            </div>
            <div className="sidebar-row">
                <PersonOutlineIcon fontSize="large"/>
                <p>Profile</p>
            </div>
            <div className="sidebar-row">
                <MoreHorizIcon fontSize="large"/>
                <p>More</p>
            </div>
            <div className="sidebar-row">
                <button className="sidebar-btn__text">Tweet</button>
            </div>
            <div className="sidebar-row">
                <img className="sidebar-btn__icon" src={NewTweet} alt="newTweet"/>
            </div>
        </div>
    )
}

export default Sidebar;