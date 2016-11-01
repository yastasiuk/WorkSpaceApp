import * as types from '../actions/actionTypes';
import initialState from './initialState';
import Seat from '../components/canvasManipulation/shapes';

export function arrSeatsReducer(state = initialState.seats, action) {
    switch (action.type) {
        case types.NEW_SEAT:
            return [...state, new Seat(action.seat)];
		case types.UPDATE_SEAT_INFO:
			return state;
		case types.UPDATE_SEAT_USER:
			var i = getIndex(state, action.seat);
			if(i < 0)
				return state;
			var el = state[i];
			var newSeatOpt = {
				id: el.id,
				x : el.x,
				y : el.y,
				name: el.name,
				radius: el.radius,
				floor: el.floor,
				assignedTo: Object.assign({}, action.seat.assignedTo),
				fillStyle: el.fillStyle
			};
			return [...state.slice(0, i), new Seat(newSeatOpt), ...state.slice(i+1)];
		case types.UPDATE_SEAT_LOCATION:
			var i = getIndex(state, action);
			if(i < 0)
				return state;
			var el = state[i];
			var newSeatOpt = {
				id: el.id,
				x : action.x,
				y : action.y,
				name: el.name,
				radius: el.radius,
				floor: el.floor,
				assignedTo: el.assignedTo,
				fillStyle: el.fillStyle
			};
            return [...state.slice(0, i), new Seat(newSeatOpt), ...state.slice(i+1)];
		case types.DELETE_SEAT:
			return state.filter((v)=>v.id !== action.id);
        default:
            return state;
    }
};

export function selectSeatReducer(state = initialState.selectedSeat, action){
	switch (action.type) {
		case types.SELECT_SEAT:
			return action.seat;
		default:
			return state;
	}
}

function getIndex(state, action){
	var i = -1;
	state.some((el, index)=>{
		if(el.id == action.id){
			i = index;
			return true;}
	});
	return i;
}