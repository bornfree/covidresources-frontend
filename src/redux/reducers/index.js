import { LOAD_DATA, SELECT_CATEGORY, SELECT_LOCATION, VOTE } from '../actionTypes';
import _ from 'lodash';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactGA from 'react-ga';

const VOTING_URL = `//${process.env.REACT_APP_API_HOST}/api/vote`;

const initialState = {

    data: null,
    selectedLocation: '',
    selectedCategory: '',
    locations: [],
    categories: [],
    results: []

};

ReactGA.initialize(process.env.REACT_APP_GA_ID);

function getLinkParts() {
    let [x, location, category, result_id] = window.location.pathname.split("/");

    if(location) {
        location = location.replace('_', ' ');
    }

    if(category) {
        category = category.replace('_', ' ');
    }

    return {
        location,
        category,
        result_id
    }

}

function sortResults(results) {
    try{
        return _.sortBy(results, result => {
            return -Date.parse(result.lastVerified);
        });
    } catch(err) {
        console.error(err, "Could not parse by date")
        return results;
    }
}

function rootReducer(state= initialState, action) {
        
    switch(action.type) {

        case LOAD_DATA:
            
            ReactGA.pageview('/');

            let locations = _.uniq( Object.keys(action.payload.data) );
            locations = _.orderBy(locations, [location => location.toLowerCase()], ['asc']);

            locations = _.reject(locations, location => {
                let availableCategories = _.uniq( _.map(action.payload.data[location], 'category') );
                return availableCategories.length === 0;
            });

            let linkParts = getLinkParts();
            if (linkParts.location && linkParts.category) {

                let results = _.filter(action.payload.data[linkParts.location], result => {
                    return result.category === linkParts.category;
                });

                results = sortResults(results);

                let categories = _.uniq( _.map(action.payload.data[linkParts.location], 'category') );

                return {
                    data: action.payload.data,
                    selectedLocation: linkParts.location,
                    selectedCategory: linkParts.category,
                    locations,
                    categories,
                    results
                };

            }
            
            return {
                ...state,
                locations,
                data: action.payload.data
            };

        case SELECT_LOCATION:
            
            let newLocation = action.payload.location;
            let newCategories = _.uniq( _.map(state.data[newLocation], 'category') );

            ReactGA.event({
                category: 'location',
                action: 'select',
                label: newLocation
            });
            
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

            newResults = sortResults(newResults);

            ReactGA.event({
                category: 'category',
                action: 'select',
                label: newCategory
            });

            return {
                ...state,
                selectedCategory: newCategory,
                results: newResults
            }
        
        case VOTE:

            ReactGA.event({
                category: 'vote',
                action: 'vote button',
                label: action.payload.direction,
            });

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