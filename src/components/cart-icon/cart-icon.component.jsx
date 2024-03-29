import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { toggleCartDropdown } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartDropdown, itemCount }) => {
    return (
        <div className="cart-icon" onClick={toggleCartDropdown}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    toggleCartDropdown: () => dispatch(toggleCartDropdown())
});

const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);
