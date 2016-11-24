console.log("Hello, react, again and again!");

import * as Redux from 'redux';

// Hello, Redux state
const store_test = Redux.createStore(function(state, action) {  // reducer function
	switch(action.type) {
		case 'ADD_CARD':
			let newCard = Object.assign({}, action.data, {
				score: 1, 
				id: +new Date
			});   // immunability idea - always create new state

			return Object.assign({}, state, {
				cards: state.cards ? state.cards.concat([newCard]) : [newCard]  // immunability: return new array
			});

		default:
			return state || {};
	}
});

store_test.subscribe( () => {  // subscribe to state changes
	console.log('store_test: ' + JSON.stringify(store_test.getState()));
});

store_test.dispatch({
	type: 'ADD_CARD',
	data: {
		front: 'front',
		back: 'back'
	}
});  // send action object