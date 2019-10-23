import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, hidden }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                {currentUser ? <h3>Howdy, {currentUser.displayName}</h3> : null}
                <Link className="option" to="/shop">
                    Shop
                </Link>
                <Link className="option" to="/shop">
                    Contact
                </Link>
                {currentUser ? (
                    <div onClick={() => auth.signOut()}>SIGN OUT</div>
                ) : (
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link>
                )}

                <CartIcon />
            </div>
            {hidden ? null : <CartDropdown />}
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    hidden: selectHidden(state)
});

export default connect(mapStateToProps)(Header);
// export default Header;
