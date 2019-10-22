import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopPage/shoppage.component";
import Header from "./components/header/header.component";
import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

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
const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
