import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopPage/shoppage.component";
import "./App.css";
import Header from "./components/header/header.component";

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact={true} path="/" component={HomePage} />
                <Route exact={true} path="/shop" component={ShopPage} />
            </Switch>
        </div>
    );
}

export default App;
