import React from "react";
import { withRouter } from "react-router-dom";
import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartDropdown } from "../../redux/cart/cart.actions";

const CartDropdown = ({ items, history, dispatch }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {items.length > 0 ? (
                    items.map(item => <CartItem key={item.id} item={item} />)
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )}
            </div>
            <CustomButton
                onClick={() => {
                    dispatch(toggleCartDropdown());
                    history.push("/checkout");
                }}>
                Go To Checkout
            </CustomButton>
        </div>
    );
};

const mapStateToProps = state => ({
    items: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
