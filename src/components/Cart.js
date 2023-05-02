import React from "react"

const Cart = (props) => {

    return <div className="product-outer-box">
        <h1 style={{ marginTop: "0px" }}>Your Cart</h1>
        <div className="products-container">
            {props.products.map((data) => {
                return <div className="product-box">
                    <h4>{data.productId.name}</h4>
                </div>
            })}
        </div>


    </div>
}

export default Cart