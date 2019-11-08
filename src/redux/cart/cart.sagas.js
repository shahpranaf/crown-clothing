import { takeLatest, call, all, put } from "redux-saga/effects";
import userActionsTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartAfterSignout() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionsTypes.SIGN_OUT_SUCCESS, clearCartAfterSignout);
}

export default function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
}
