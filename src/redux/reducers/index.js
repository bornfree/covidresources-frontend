import { LOAD_DATA, SELECT_CATEGORY, SELECT_LOCATION, VOTE } from '../actionTypes';
import _ from 'lodash';
import { toast } from 'react-toastify';
import axios from 'axios';

const VOTING_URL = `//${process.env.REACT_APP_API_HOST}/api/vote`;

const initialState = {

    data: null,
    selectedLocation: '',
    selectedCategory: '',
    locations: [],
    categories: [],
    results: []

};

  
function rootReducer(state= initialState, action) {
    console.log(action);
        
    switch(action.type) {

        case LOAD_DATA:

            let locations = _.uniq( Object.keys(action.payload.data) );
            locations = _.orderBy(locations, [location => location.toLowerCase()], ['asc']);
            
            return {
                ...state,
                locations,
                data: action.payload.data
            };

        case SELECT_LOCATION:
            
            let newLocation = action.payload.location;
            let newCategories = _.uniq( _.map(state.data[newLocation], 'category') );
            
            return {
                ...state,
                selectedLocation: newLocation,
                selectedCategory: '',
                results: [],
                categories: newCategories
            }

        case SELECT_CATEGORY:

            let newCategory = action.payload.category;
            let newResults = _.filter(state.data[state.selectedLocation], result => {
                return result.category === newCategory;
            });

            return {
                ...state,
                selectedCategory: newCategory,
                results: newResults
            }
        
        case VOTE:

            axios.post(VOTING_URL, {
                result_id: action.payload.result_id,
                direction: action.payload.direction
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });

            toast.dark("Thank you voting. This will help others find valid information.")
            return {
                ...state
            }
    
        default:
            return state;

    }
}

export default rootReducer;