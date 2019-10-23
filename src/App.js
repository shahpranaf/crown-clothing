import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import Header from "./components/header/header.component";
import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkoutpage/checkoutpage.component";

class App extends React.Component {
    unsubscribeAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    render() {
        const { currentUser } = this.props;
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route exact={true} path="/shop" component={ShopPage} />
                    <Route
                        exact={true}
                        path="/signin"
                        render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
                    />

                    <Route exact={true} path="/checkout" component={CheckoutPage} />
                </Switch>
            </div>
        );
    }

    componentWillUnmount() {
        this.unsubscribeAuth();
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});
const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
