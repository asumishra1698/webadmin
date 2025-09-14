import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import blogSaga from "./blogSaga";
import leadsSaga from "./leadsSaga";
import productSaga from "./productSaga";
import referenceSaga from "./referenceSaga";
import projectSaga from "./projectSaga";
import saleRmSaga from "./saleRmSaga";
import { watchGetBrokers } from "./brokerSaga";

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
  ]);
}
