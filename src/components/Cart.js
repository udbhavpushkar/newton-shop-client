import axios from "axios";
import React, { useState } from "react"

const Cart = (props) => {

    const [order, setOrder] = useState(false)
    const [formData, setFormData] = useState({})

    const handleQuantityUpdate = async (prodId, updatedQuantity) => {

        //send prod id and updated quantity in api request
        const response = await axios.post(`http://localhost:8009/cart/updateQuantity/${props.cartId}`, { productId: prodId, updatedQuantity: updatedQuantity })
        console.log(response.data);
        props.fetchCartDetails()
    }

    const handleInputChange = (e) => {
        let data = { ...formData }
        data[e.target.name] = e.target.value
        setFormData(data)
    }

    const handleOrderSubmit = async (e) => {
        e.preventDefault()
        let payload = { ...formData, cartId: props.cartId }
        let response = await axios.post(`http://localhost:8009/order/`, payload)
        props.fetchCartDetails()
        //send cartId, email, name , address to api request

    }

    return <div className="product-outer-box">
        <h1 style={{ marginTop: "0px" }}>Your Cart</h1>
        <div className="products-container">
            {props.products.map((data) => {
                return <div className="product-box">
                    <h4>{data.productId.name}</h4>
                    <div>
                        Quantity: {data.quantity}
                        <button onClick={() => { handleQuantityUpdate(data.productId._id, data.quantity + 1) }}>+</button>
                        <button onClick={() => { handleQuantityUpdate(data.productId._id, data.quantity - 1) }}>-</button>
                    </div>
                </div>
            })}
        </div>
        <div>
            <button onClick={() => { setOrder(true) }} className="btn-block">
                Place Order
            </button>
            {order ? <div>
                <form onSubmit={handleOrderSubmit}>
                    <div className="input-wrapper">
                        <input type="text" name="name" onChange={handleInputChange} className="input" placeholder="Enter Name" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" name="email" onChange={handleInputChange} className="input" placeholder="Enter email" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" name="address" onChange={handleInputChange} className="input" placeholder="Enter address" />
                    </div>
                    <div>
                        <button type="submit" className="btn-block">Submit</button>
                    </div>
                </form>
            </div> : null}
        </div>


    </div>
}

export default Cart