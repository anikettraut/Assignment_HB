import ACTION_TYPES from '../../actions/ActionType';
const INITIAL_STATE = {
    data: '',
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ACTION_TYPES.GET_SHOPPING_LIST:

            action.payload.map(item => {

                item.isAddedToCart = false;
                item.quantity = 1;

            });
            return { ...state, data: action.payload }

        default:
            return state;
    }

};
