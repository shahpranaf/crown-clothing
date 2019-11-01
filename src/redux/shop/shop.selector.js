import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     women: 4,
//     men: 5
// };
const selectShop = state => state.shop;

const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsPreview = createSelector(
    [selectShopCollections],
    collections => (collections ? Object.keys(collections).map(key => collections[key]) : [])
);

export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    );

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoading = createSelector(
    [selectShop],
    shop => !!shop.collections
);

export default selectShopCollections;
