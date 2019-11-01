import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "./shoppage.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collectionpage/collectionpage.component";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionFetching, selectIsCollectionsLoading } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const { match, isCollectionFetching: loading, isCollectionsLoading } = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact={true}
                    path={`${match.path}`}
                    render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={props => <CollectionPageWithSpinner isLoading={!isCollectionsLoading} {...props} />}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoading: selectIsCollectionsLoading
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
