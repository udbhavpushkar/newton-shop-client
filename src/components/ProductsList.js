import axios from "axios";
import React, { useEffect, useState } from "react"
import Cart from "./Cart";

const ProductsList = () => {

    const [products, setProducts] = useState([])
    const [cartDetails, setCartDetails] = useState()
    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        fetchProducts()
        fetchCartDetails()
    }, [])

    const fetchCartDetails = async () => {
        try {
            const token = localStorage.getItem("auth_token")
            const header = { "Authorization": `Bearer ${token}` }
            const response = await axios.get(`http://localhost:8009/cart/get/`, { headers: header })
            console.log(response.data);
            setCartDetails(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("auth_token")
            const header = { "Authorization": `Bearer ${token}` }
            const response = await axios.get(`http://localhost:8009/product`, { headers: header })
            setProducts(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addItemInCart = async (id) => {
        try {
            let payload = { productId: id }
            const response = await axios.post(`http://localhost:8009/cart/addItem/${cartDetails._id}`, payload)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="product-outer-box">
        <button onClick={() => { setShowCart(!showCart) }}>{showCart ? "Hide Cart" : "Show Cart"}</button>
        {showCart ? <Cart products={cartDetails.items} /> : null}
        <h1 style={{ marginTop: "0px" }}>Products List</h1>
        <div className="products-container">
            {products.map((data) => {
                return <div className="product-box">
                    <h4>Name : {data.name}</h4>
                    <h5>Price : {data.price}</h5>
                    <button className="btn-block" onClick={() => { addItemInCart(data._id) }}>Add To Cart</button>
                </div>
            })}
        </div>

    </div>
}

export default ProductsList