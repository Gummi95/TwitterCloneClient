import hero from "../../Assets/twitterlogin.PNG";
import tweeter from "../../Assets/tweet.png";
import "./Login.css";
import { Link } from 'react-router-dom';
import "../../App.css"

const Login = () => {

    return(
        <div className="container">
            <div className="col">
                <div className="login-row">
                    <img src={hero} className="hero-img" alt="coverphoto"/>
                    <div className="login-right">
                        <img src={tweeter} alt="logo" className="logo-img"/>
                        <h2>Happening now</h2>
                        <h4>Join Twitter today.</h4>
                        <Link className="login-link" to="/home">Login with Google</Link>
                        <p>or</p>
                        <Link className="sign-up-link" to="/register">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;