import React from "react";

// import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectHidden } from "../../redux/cart/cart.selectors";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";
import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, hidden, signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                {currentUser && currentUser.displayName ? <h3>Howdy, {currentUser.displayName}</h3> : null}
                <OptionLink to="/shop">Shop</OptionLink>
                <OptionLink to="/shop">Contact</OptionLink>
                {console.log("idhar", currentUser)}
                {currentUser && currentUser.displayName ? (
                    <OptionLink as="div" onClick={signOutStart}>
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                )}

                <CartIcon />
            </OptionsContainer>
            {hidden ? null : <CartDropdown />}
        </HeaderContainer>
    );
};

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    hidden: selectHidden(state)
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
// export default Header;
