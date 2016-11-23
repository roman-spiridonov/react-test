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


/* Redux is all about managing the state through actions and reducers = functions of state and action */
// State
// {
// 	cards: [{ id: 123, score: 1, deckId: 12 }],
// 	decks: [{ id: 12, name: "string"}],
//  addingDeck: true/false,
// 	selectedDeck: 123, 
// 	studyMode: true/false
// }


// Actions (some with data, some without)
// ADD_DECK
// SHOW_ADD_DECK
// HIDE_ADD_DECK
var _addDeck = function _addDeck(name) {
    return { type: 'ADD_DECK', data: name };
}; // convention: action-creator functions return action object
var _showAddDeck = function _showAddDeck() {
    return { type: 'SHOW_ADD_DECK' };
};
var _hideAddDeck = function _hideAddDeck() {
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
            return !!state; // initially, state is undefined (!!state would return false in case of undefined)
    }
};

var store = Redux.createStore(Redux.combineReducers({
    cards: cards, // state property: reducer
    // function(state, action) {  // reducer function
    // 	return {
    // 		cards: cards(state.cards, action),
    // 		decks: decks(state.decks, action)
    // 	}
    decks: decks, // similar to decks: decks
    addingDeck: addingDeck
}));

// PURE React component (function)
var App = function App(props) {
    // takes component properties, returns JSX that gets converted into React.createLement() by babelify
    return React.createElement(
        'div',
        { className: 'app' },
        props.children
    );
};

var Sidebar = React.createClass({
    displayName: 'Sidebar',
    // Sidebar React component
    componentDidUpdate: function componentDidUpdate() {
        var el = ReactDOM.findDOMNode(this.refs.add);
        if (el) el.focus(); // focus if there is an input box
    },
    render: function render() {
        var _this = this;

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
                'button',
                { onClick: function onClick(e) {
                        return _this.props.showAddDeck();
                    } },
                'New Deck'
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
                } // sibling elements need to have a key in JSX
                )
            ),
            props.addingDeck && React.createElement('input', { ref: 'add', onKeyPress: this.createDeck })
        );
    },
    createDeck: function createDeck(evt) {
        if (evt.which !== 13) {
            return; // if not ENTER key
        }
        var name = ReactDOM.findDOMNode(this.refs.add).value; // find input field
        this.props.addDeck(name);
        this.props.hideAddDeck();
    }
});

function run() {
    var state = store.getState();
    console.log(state);
    ReactDOM.render(React.createElement(
        App,
        null,
        React.createElement(Sidebar, {
            decks: state.decks /*[ {name: 'Deck 1'}]*/,
            addingDeck: state.addingDeck,

            addDeck: function addDeck(name) {
                return store.dispatch(_addDeck(name));
            } // will be available in React component through this.props
            , showAddDeck: function showAddDeck() {
                return store.dispatch(_showAddDeck());
            },
            hideAddDeck: function hideAddDeck() {
                return store.dispatch(_hideAddDeck());
            }
        }),
        React.createElement(
            'div',
            null,
            'That\'s it!'
        )
    ), document.getElementById('root'));
}

run();
store.subscribe(run); // call run whenever the store changes


// Make functions available in the console
// window.show = () => store.dispatch(showAddDeck());
// window.hide = () => store.dispatch(hideAddDeck());
// window.add  = () => store.dispatch(addDeck(new Date().toString()));

},{}]},{},[1]);
