import {ADD_VIDEO } from './types';
import {FETCH_VIDEO} from './types';

import axios from 'axios';
// export const submitTest = (values,history) =>async dispatch =>{
//     const res = await axios.post('/api/texttest', values)
    
//     history.push('/dashboard');
//     dispatch(
//         {
//             type:SUBMIT_TEST,
//             payload:res.data
//         }
//     )
// };

export const addVideo = (value) => async dispatch =>{
    const res = await axios.post('/api/addVideo',value)
    dispatch({
        type:ADD_VIDEO,
        payload:res.data
    })
}

export const fetchVideo = (_id) => async dispatch =>{
    const res = await axios.get(`/api/fetchVideo/${_id}`);
    dispatch({
        type:FETCH_VIDEO,
        payload : res.data
    })
}