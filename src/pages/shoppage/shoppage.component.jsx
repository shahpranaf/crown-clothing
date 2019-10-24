import React from "react";
import { Route } from "react-router-dom";
import "./shoppage.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collectionpage/collectionpage.component";

const ShopPage = ({ match }) => {
    console.log(match);
    return (
        <div className="shop-page">
            <Route exact={true} path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    );
};

export default ShopPage;