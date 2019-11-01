import shopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collections => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
});

export const fetchCollectionsFailure = errMessage => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");

        dispatch(fetchCollectionsStart());

        collectionRef.get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    const collections = convertCollectionsSnapshotToMap(snapshot);
                    dispatch(fetchCollectionsSuccess(collections))
                }
            })
            .catch(err => dispatch(fetchCollectionsFailure(err.message)));
    }
};
