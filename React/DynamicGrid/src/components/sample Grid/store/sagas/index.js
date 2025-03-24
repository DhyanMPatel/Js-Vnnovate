import { call, put, takeEvery } from "redux-saga/effects";
import { fetchUsers } from "./sagaRequests";
import {
  fetchSampleFailure,
  fetchSamplesRequest,
  fetchSampleSuccess,
} from "../sampleGridSlice";

function* fetchSamples() {
  try {
    const response = yield call(fetchUsers);
    yield put(fetchSampleSuccess(response.data));
  } catch (error) {
    yield put(fetchSampleFailure(error.message));
  }
}

function* watchFetchSamples() {
  yield takeEvery(fetchSamplesRequest, fetchSamples);
}
export default watchFetchSamples;
