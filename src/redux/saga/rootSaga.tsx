import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import blogSaga from "./blogSaga";
import leadsSaga from "./leadsSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(blogSaga), fork(leadsSaga)]);
}
