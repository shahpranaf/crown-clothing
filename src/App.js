import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopPage/shoppage.component";
import Header from "./components/header/header.component";
import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
    unsubscribeAuth = null;
    constructor() {
        super();

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        this.unsubscribeAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });
        });
    }

    render() {
        return (
            <div className="App">
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route exact={true} path="/shop" component={ShopPage} />
                    <Route exact={true} path="/signin" component={SignInAndSignUpPage} />
                </Switch>
            </div>
        );
    }

    componentWillUnmount() {
        this.unsubscribeAuth();
    }
}

export default App;
