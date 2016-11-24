// Actions (some with data, some without)
// ADD_DECK
// SHOW_ADD_DECK
// HIDE_ADD_DECK
export const addDeck = name => ({ type: 'ADD_DECK', data: name }); // convention: action-creator functions return action object
export const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
export const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });