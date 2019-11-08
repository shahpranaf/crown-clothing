import { takeLatest, call, put, all } from "redux-saga/effects";
import userActionsTypes from "./user.types";
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from "./../../firebase/firebase.utils";
import {
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutSuccess,
    emailSignInStart,
    signUpFailure,
    signUpSuccess
} from "./user.actions";
import { clearCart } from "../cart/cart.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const snapShot = yield userRef.get();

        yield put(
            signInSuccess({
                id: snapShot.id,
                ...snapShot.data()
            })
        );
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        console.log("pp", userAuth);
        if (!userAuth) return;

        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}
export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (err) {
        yield put(signUpFailure());
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* googleSigninStart() {
    yield takeLatest(userActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(userActionsTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(userActionsTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(userActionsTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(userActionsTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export default function* userSagas() {
    yield all([
        call(googleSigninStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}
