import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    return (
        <div className="registration">
            <h3>There is no registration screen</h3>
            <button onClick={navigate(-1)}>Go Back</button>
        </div>

    )
}

export default Register;