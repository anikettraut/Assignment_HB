import { put, call, takeEvery, takeLatest, select, cps } from 'redux-saga/effects';
import API from '../utils/APIUrl';
import API_CONST from '../utils/Constants';
import ACTION_TYPES from '../actions/ActionType';

const _apiCall = (url, data) => {
    return fetch(url, data)
        .then((res) => {
            return { res: res, res_json: res.json() };
        })
        .catch((e) => {
            throw e;
        });
};

//get response json
const _extJSON = (p) => {
    return p.then((res) => res);
};


function* getShoppingList() {

    try {
        let response = yield call(_apiCall, API.GET_LIST, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }

        });
        var responseJSON = yield call(_extJSON, response.res_json);
        yield put({
            type: ACTION_TYPES.GET_SHOPPING_LIST,
            payload: responseJSON
        });
    } catch (e) {
        //console.log('Error: ' + e);
    }
}



function* rootSaga() {
    yield takeLatest(API_CONST.SHOPPING_LIST, getShoppingList);
}

export default rootSaga;