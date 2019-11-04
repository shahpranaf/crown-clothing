import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "./shoppage.styles.scss";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview-container.component";
import CollectionOverview from "../collectionpage/collection-container";
import { fetchCollectionsStartAsync, fetchCollectionsStart } from "../../redux/shop/shop.actions";
// import { fetchCollectionsStart } from "../../redux/shop/shop.sagas";

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const { match, isCollectionsLoading } = this.props;
        return (
            <div className="shop-page">
                <Route exact={true} path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionOverview} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStart())
});

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);
