import apiController from './ApiController.js';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const RefreshToken = (callback = () => {}) => {
    // const refreshToken = localStorage.getItem('refreshToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken === null){
        callback();
        console.log('refreshToken failed');
        return;
    }

    axios.defaults.headers.common['X-Refresh-Token'] = refreshToken;

    axios.put('api/auth')
    .then((response) => { //토큰 리프레쉬 함 성공
        const {accessToken, refreshToken} = response.data;
        apiController.defaults.headers.common['Authorization'] = accessToken;
        
        localStorage.setItem('refreshToken', refreshToken);
        
        console.log('refreshToken success');
    })
    .catch(() => { //리프레쉬 실패 리프레쉬 토큰 만료 실패
        apiController.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('refreshToken');
        console.log('refreshToken failed');
    })
    .finally(() => {
        callback()
    })
}

export const ClearToken = () => {
    axios.defaults.headers.common['X-Refresh-Token'] = null;
    localStorage.removeItem('refreshToken');
    apiController.defaults.headers.common['Authorization'] = null;
}