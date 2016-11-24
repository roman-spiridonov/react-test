// Each top-level state property will have its reducer
export const cards = (state, action) => {
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

export const decks = (state, action) => {
    switch (action.type) {
        case 'ADD_DECK':
            let newDeck = { name: action.data, id: +new Date };
            return state.concat([newDeck]);
        default:
            return state || [];
    }
};

export const addingDeck = (state, action) => {
    switch (action.type) {
        case 'SHOW_ADD_DECK':
            return true;
        case 'HIDE_ADD_DECK':
            return false;
        default:
            return !!state; // initially, state is undefined (!!state would return false in case of undefined)
    }
};