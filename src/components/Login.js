import axios from "axios"
import React, { useState } from "react"

const Login = (props) => {

    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState()

    const handleInputChange = (e) => {
        let data = { ...formData }
        data[e.target.name] = e.target.value
        setFormData(data)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post(`http://localhost:8009/user/login`, formData)
            console.log(response.data);
            setFormData({})
            setMessage({ type: "success", text: "Login Successfull !" })
            //set isLoggedIn from parent to true
            props.setIsLoggedIn(true)
            localStorage.setItem("auth_token", response.data.token)
        } catch (error) {
            console.log(error.response.data);
            setMessage({ type: "error", text: error.response.data })
        }
    }

    return <div className="login-box">
        <h1 style={{ marginTop: "0px" }}>Login</h1>
        <div className="input-wrapper">
            <input type="email" name="email" onChange={handleInputChange} className="input" placeholder="Enter email" />
        </div>
        <div className="input-wrapper">
            <input type="password" name="password" onChange={handleInputChange} className="input" placeholder="Enter password" />
        </div>
        <div>
            <button onClick={handleLogin} className="btn-block">Login</button>
        </div>
        {message ? <div className={message.type}>{message.text}</div> : null}
    </div>
}

export default Login