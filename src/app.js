import './store_test.js'

/* Redux is all about managing the state through actions and reducers = functions of state and action */
// State
// {
// 	cards: [{ id: 123, score: 1, deckId: 12 }],
// 	decks: [{ id: 12, name: "string"}],
//  addingDeck: true/false,
// 	selectedDeck: 123, 
// 	studyMode: true/false
// }

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { addDeck, showAddDeck, hideAddDeck } from './actions';
import * as reducers from './reducers';
import App from './components/App';
import Sidebar from './components/Sidebar';


const store = createStore(  // Redux.createStore
    combineReducers(reducers)  // Redux.combineReducers
    // {
    //     cards: cards, // state property: reducer
    //     // function(state, action) {  // reducer function
    //     // 	return {
    //     // 		cards: cards(state.cards, action),
    //     // 		decks: decks(state.decks, action)
    //     // 	}
    //     decks, // concise for decks: decks
    //     addingDeck
    // })
);


function run() {
    let state = store.getState();
    console.log(state);
    ReactDOM.render((<App>
		<Sidebar 
			decks={ state.decks /*[ {name: 'Deck 1'}]*/ } 
			addingDeck={state.addingDeck}
			
			addDeck = {name => store.dispatch(addDeck(name))}    // will be available in React component through this.props
			showAddDeck = {() => store.dispatch(showAddDeck())}
			hideAddDeck = {() => store.dispatch(hideAddDeck())}  
			 />
		<div>That's it!</div>
	</App>), document.getElementById('root'));
}

run();
store.subscribe(run); // call run whenever the store changes

// Make functions available in the console
// window.show = () => store.dispatch(showAddDeck());
// window.hide = () => store.dispatch(hideAddDeck());
// window.add  = () => store.dispatch(addDeck(new Date().toString()));
