import React, { useState } from "react"
import axios from "axios"

const Register = () => {

    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState()

    const handleInputChange = (e) => {
        let data = { ...formData }
        data[e.target.name] = e.target.value
        setFormData(data)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post(`http://localhost:8009/user/register`, formData)
            console.log(response.data);
            e.target.reset()
            setFormData({})
            setMessage({ type: "success", text: "Registration Successfull !" })
        } catch (error) {
            console.log(error.response.data);
            setMessage({ type: "error", text: error.response.data })
        }
        //call register api and send name email and password in it
    }

    return <div className="login-box">
        <h1 style={{ marginTop: "0px" }}>Register</h1>
        <form onSubmit={handleRegister}>
            <div className="input-wrapper">
                <input type="text" name="name" onChange={handleInputChange} className="input" placeholder="Enter Name" />
            </div>
            <div className="input-wrapper">
                <input type="text" name="email" onChange={handleInputChange} className="input" placeholder="Enter email" />
            </div>
            <div className="input-wrapper">
                <input type="password" name="password" onChange={handleInputChange} className="input" placeholder="Enter password" />
            </div>
            <div>
                <button className="btn-block">Register</button>
            </div>
            {message ? <div className={message.type}>{message.text}</div> : null}

        </form>

    </div>
}

export default Register