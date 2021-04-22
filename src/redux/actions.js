import { LOAD_DATA, SELECT_CATEGORY, SELECT_LOCATION, VOTE } from './actionTypes';

export const loadData = (data) => ({
    type: LOAD_DATA,
    payload: {
        data
    }
});

export const selectLocation = (location) => ({
    type: SELECT_LOCATION,
    payload: {
        location
    }
});

export const selectCategory = (category) => ({
    type: SELECT_CATEGORY,
    payload: {
        category
    }
});

export const vote = (result_id, direction) => ({
    type: VOTE,
    payload: {
        result_id,
        direction
    }
});