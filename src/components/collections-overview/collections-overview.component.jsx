import React from "react";
import "./collections-overview.styles.scss";
import { connect } from "react-redux";
import CollectionPreview from "../collection-prevew/collection-preview.component";
import { selectCollectionsPreview } from "../../redux/shop/shop.selector";

const CollectionsOverview = ({ collections }) => {
    return (
        <div className="collection-overview">
            {collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    collections: selectCollectionsPreview(state)
});

export default connect(mapStateToProps)(CollectionsOverview);
