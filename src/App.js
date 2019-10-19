import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";

const HatsPage = () => {
    return (
        <div>
            <h1>Hats Page</h1>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact={true} path="/" component={HomePage} />
                <Route exact={true} path="/shop/hats" component={HatsPage} />
            </Switch>
        </div>
    );
}

export default App;
