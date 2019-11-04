import { takeLatest, call, put } from "redux-saga/effects";

import shopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";
export function* fetchCollectionsAsync() {
    yield console.log("I am fired");
    try {
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        if (!snapshot.empty) {
            const collections = yield call(convertCollectionsSnapshotToMap, snapshot);
            yield put(fetchCollectionsSuccess(collections));
        }
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
