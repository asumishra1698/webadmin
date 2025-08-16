import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import blogSaga from "./blogSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(blogSaga)]);
}
