import { combineReducers } from 'redux';

import cart from './cart/reducer';

/**
 * Para cada novo reducer, basta importá-lo aqui e colocá-lo na função combineReducers
 */
export default combineReducers({
  cart,
});
