import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ProductsList from './components/ProductsList';

function App() {
  const [activeSection, setActiveSection] = useState("register")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      setActiveSection("product-list")
    }
  }, [isLoggedIn])

  const logout = () => {
    localStorage.removeItem("auth_token")
    setIsLoggedIn(false)
    setActiveSection("login")
  }

  return (
    <div className="App">

      {activeSection === "register" ? <div>Already Registered ?
        <span onClick={() => { setActiveSection("login") }} className='link'>Login</span>
      </div> : null}
      {activeSection === "login" ? <div>Havent Register yet ?
        <span onClick={() => { setActiveSection("register") }} className='link'>Register</span>
      </div> : null}
      {isLoggedIn ? <div className='link' onClick={logout}>Logout</div> : null}


      {activeSection === "register" ? <Register /> : null}
      {activeSection === "login" ? <Login setIsLoggedIn={setIsLoggedIn} /> : null}
      {activeSection === "product-list" ? <ProductsList /> : null}
    </div>
  );
}

export default App;
