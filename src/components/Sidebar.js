import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';

const mapStateToProps = (state) => ({  // takes current state and returns props for presentational component 
    decks: state.decks,  /*[ {name: 'Deck 1'}]*/
    addingDeck: state.addingDeck
});

const mapDispatchToProps = dispatch => ({  // maps dispatch function to the callbacks for presentational component 
    addDeck: name => dispatch(addDeck(name)),    // will be available in React component through this.props
    showAddDeck: () => dispatch(showAddDeck()),
    hideAddDeck: () => dispatch(hideAddDeck())
});

const Sidebar = React.createClass({ // Sidebar React presentational component
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);  // exporting new container component