import './App.css';
import Login from "./Components/LoginPage/Login";
import OpenTweet from './Components/Tweets/OpenTweet/OpenTweet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import Register from "./Register/Register";


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route path="/" element={<Login/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/tweet/:id"  element={<OpenTweet/>}/>
          </Routes>
      </header>
    </div>
  );
}

export default App;
