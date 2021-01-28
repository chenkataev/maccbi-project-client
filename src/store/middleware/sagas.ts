import axios from 'axios';
import { all, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../reducers/users';

export function* updateUsers() {
    yield put({ type: 'mainApp/updateIsLoading', payload: true })
    try {
        const response = yield axios.get('http://localhost:4000/users');
        console.log(response)
        if (response.status === 200) {
            const data = response.data
            const users: User[] = []
            Object.keys(data).forEach(userEmail => {
                const newObject = {...data[userEmail], email: userEmail};
                users.push(newObject)
            })
            yield put({ type: 'users/updateUsers', payload: users })
        }
    
    } catch (err) {
        console.log(err);;
    }
    yield put({ type: 'mainApp/updateIsLoading', payload: false })
}

export function* addNewUser(action: PayloadAction<any>) {
    const { name, age, email } = action.payload
    if (!name || !email) {
        return alert('please fill all the fields')
    };
    const data = {
        name: name,
        email: email,
        age: age
    }
    yield put({ type: 'mainApp/updateIsLoading', payload: true })
    try {
        const response = yield axios.post('http://localhost:4000/users', data);
        if (response.status === 201) {
            yield put({ type: 'users/addUser', payload: data })
        }
    } catch (err) {
        console.log(err);
    }
    yield put({ type: 'mainApp/updateIsLoading', payload: false })
}

export function* deleteUserSaga(action: PayloadAction<any>) {
    const { email } = action.payload

    if (!email) {
        return alert('please fill all the fields')
    };
    const data = {
        email
    }
    yield put({ type: 'mainApp/updateIsLoading', payload: true })
    try {
        const response = yield axios.delete(`http://localhost:4000/users/${email}`);
        if (response.status === 201) {
            yield put({ type: 'users/deleteUser', payload: data })
        }
    } catch (err) {
        console.log(err);
    }
    yield put({ type: 'mainApp/updateIsLoading', payload: false })
}

export default function* rootSaga() {
    yield takeEvery('users/updateUsers', updateUsers);
    yield takeEvery('users/addUser', addNewUser);
    yield takeEvery('users/deleteUser', deleteUserSaga);
}
