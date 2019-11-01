import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionFetching, selectIsCollectionsLoading } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

export default CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
