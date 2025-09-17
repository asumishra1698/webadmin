import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import blogSaga from "./blogSaga";
import leadsSaga from "./leadsSaga";
import productSaga from "./productSaga";
import referenceSaga from "./referenceSaga";
import projectSaga from "./projectSaga";
import saleRmSaga from "./saleRmSaga";
import { watchGetBrokers } from "./brokerSaga";
import visitorSaga from "./visitorSaga";
import visitsSaga from "./visitsSaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(blogSaga),
    fork(leadsSaga),
    fork(productSaga),
    fork(referenceSaga),
    fork(projectSaga),
    fork(saleRmSaga),
    fork(watchGetBrokers),
    fork(visitorSaga),
    fork(visitsSaga),
  ]);
}
