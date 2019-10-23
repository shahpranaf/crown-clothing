import React from "react";
import { connect } from "react-redux";
import { selectCartTotal, selectCartItems } from "../../redux/cart/cart.selectors";
import "./checkoutpage.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({ cartItems, cartTotal }) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>

                <div className="header-block">
                    <span>Description</span>
                </div>

                <div className="header-block">
                    <span>Quantity</span>
                </div>

                <div className="header-block">
                    <span>Price</span>
                </div>

                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className="total">Total: Rs {cartTotal}</div>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: selectCartItems(state),
    cartTotal: selectCartTotal(state)
});
export default connect(mapStateToProps)(CheckoutPage);
