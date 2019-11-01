import { connect } from "react-redux";
import { compose } from "redux";
import CollectionPage from "./collectionpage.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionOverview = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionOverview;
