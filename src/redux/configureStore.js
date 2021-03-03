import {createStore, combineReducers} from 'redux';
import {createForms, initialFieldState} from 'react-redux-form'; //create reducers that takes care of form
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { InitialFeedback } from './Forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        })
    );

    return store;
}