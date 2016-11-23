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
const addDeck = name => ({ type: 'ADD_DECK', data: name }); // convention: action-creator functions return action object
const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });

// Each top-level state property will have its reducer
const cards = (state, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            let newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date
            }); // immunability idea - always create new state

            return state.concat([newCard]);

        default:
            return state || []; // default value - empty array (not object)
    }
};

const decks = (state, action) => {
    switch (action.type) {
        case 'ADD_DECK':
            let newDeck = { name: action.data, id: +new Date };
            return state.concat([newDeck]);
        default:
            return state || [];
    }
};

const addingDeck = (state, action) => {
    switch (action.type) {
        case 'SHOW_ADD_DECK':
            return true;
        case 'HIDE_ADD_DECK':
            return false;
        default:
            return !!state; // initially, state is undefined (!!state would return false in case of undefined)
    }
};


const store = Redux.createStore(
    Redux.combineReducers({
        cards: cards, // state property: reducer
        // function(state, action) {  // reducer function
        // 	return {
        // 		cards: cards(state.cards, action),
        // 		decks: decks(state.decks, action)
        // 	}
        decks, // similar to decks: decks
        addingDeck
    })
);



// PURE React component (function)
const App = (props) => { // takes component properties, returns JSX that gets converted into React.createLement() by babelify
    return (<div className='app'>
		{props.children}

	</div>);

};

const Sidebar = React.createClass({ // Sidebar React component
    componentDidUpdate() {
    	var el = ReactDOM.findDOMNode(this.refs.add);
    	if (el) el.focus(); // focus if there is an input box
    },
    render() {
        let props = this.props;
        return (<div className="sidebar">
			<h2> All Decks </h2>
			<button onClick = {e => this.props.showAddDeck()}>New Deck</button>
			<ul>
				{props.decks.map((deck, i) => 
					<li key={i}> {deck.name} </li>  // sibling elements need to have a key in JSX
				)}
			</ul>
			{ props.addingDeck && <input ref='add' onKeyPress = {this.createDeck} /> }
		</div>)
    },

    createDeck(evt) {
        if (evt.which !== 13) {
            return; // if not ENTER key
        }
        var name = ReactDOM.findDOMNode(this.refs.add).value;  // find input field
        this.props.addDeck(name);
        this.props.hideAddDeck();
    }
});

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
