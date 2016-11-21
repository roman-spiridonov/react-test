(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log("Hello, react, again and again!");

// // Hello, Redux state
// const store = Redux.createStore(function(state, action) {  // reducer function
// 	switch(action.type) {
// 		case 'ADD_CARD':
// 			let newCard = Object.assign({}, action.data, {
// 				score: 1, 
// 				id: +new Date
// 			});   // immunability idea - always create new state

// 			return Object.assign({}, state, {
// 				cards: state.cards ? state.cards.concat([newCard]) : [newCard]  // immunability: return new array
// 			});

// 		default:
// 			return state || {};
// 	}
// });

// store.subscribe( () => {  // subscribe to state changes
// 	console.log(store.getState());
// });

// store.dispatch({
// 	type: 'ADD_CARD',
// 	data: {
// 		front: 'front',
// 		back: 'back'
// 	}
// });  // send action object


/* Redux is all about managing the state through actions and reducers */
// State
// {
// 	cards: [{ deckId: 123 }],
// 	decks: [{ }],
// 	selectedDeck: 123, 
// 	studyMode: true/false
// }


// Actions (some with data, some without)
// ADD_DECK
// SHOW_ADD_DECK
// HIDE_ADD_DECK
var addDeck = function addDeck(name) {
	return { type: 'ADD_DECK', data: name };
};
var showAddDeck = function showAddDeck() {
	return { type: 'SHOW_ADD_DECK' };
};
var hideAddDeck = function hideAddDeck() {
	return { type: 'HIDE_ADD_DECK' };
};

// Each top-level state property will have its reducer
var cards = function cards(state, action) {
	switch (action.type) {
		case 'ADD_CARD':
			var newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date()
			}); // immunability idea - always create new state

			return state.concat([newCard]);

		default:
			return state || []; // default value - empty array (not object)
	}
};

var decks = function decks(state, action) {
	switch (action.type) {
		case 'ADD_DECK':
			var newDeck = { name: action.data, id: +new Date() };
			return state.concat([newDeck]);
		default:
			return state || [];
	}
};

var addingDeck = function addingDeck(state, action) {
	switch (action.type) {
		case 'SHOW_ADD_DECK':
			return true;
		case 'HIDE_ADD_DECK':
			return false;
		default:
			return !!state;
	}
};

var store = Redux.createStore(Redux.combineReducers({
	cards: cards, // state property: reducer
	// function(state, action) {  // reducer function
	// 	return {
	// 		cards: cards(state.cards, action),
	// 		decks: decks(state.decks, action)
	// 	}
	decks: decks,
	addingDeck: addingDeck
}));

// PURE React component (function)
var App = function App(props) {
	return React.createElement(
		'div',
		{ className: 'app' },
		props.children
	);
};
// ReactDOM.render(/*<App />*/<App>Hello <strong>React</strong></App>, document.getElementById('root'));

var Sidebar = React.createClass({
	displayName: 'Sidebar',
	render: function render() {
		var props = this.props;
		return React.createElement(
			'div',
			{ className: 'sidebar' },
			React.createElement(
				'h2',
				null,
				' All Decks '
			),
			React.createElement(
				'ul',
				null,
				props.decks.map(function (deck, i) {
					return React.createElement(
						'li',
						{ key: i },
						' ',
						deck.name,
						' '
					);
				})
			),
			props.addingDeck && React.createElement('input', { ref: 'add' })
		);
	}
});

function run() {
	var state = store.getState();
	console.log(state);
	ReactDOM.render(React.createElement(
		App,
		null,
		React.createElement(Sidebar, { decks: state.decks /*[ {name: 'Deck 1'}]*/, addingDeck: state.addingDeck })
	), document.getElementById('root'));
}

run();
store.subscribe(run); // call run whenever the store changes

window.show = function () {
	return store.dispatch(showAddDeck());
};
window.hide = function () {
	return store.dispatch(hideAddDeck());
};
window.add = function () {
	return store.dispatch(addDeck(new Date().toString()));
};

},{}]},{},[1]);
