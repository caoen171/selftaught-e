import {ADD_VIDEO} from '../actions/types';
import { FETCH_VIDEO } from '../actions/types';

const initialState = {
    video:{},
    videos:{}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_VIDEO:
             return {
                 ...state,
                 video:action.payload
             }; 
        case FETCH_VIDEO:
            return {
                ...state,
                video:action.payload
            }
        default:
            return state;
    }
}