const GET_USERS = 'GET_USERS';
const CHANGE_ORDER = 'CHANGE_ORDER';
const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
const ADD_USERS = 'ADD_USERS';
const USER_DETAILS = 'USER_DETAILS';

const initState = {
	users: {
		total_count: null,
		items: []
	},
	searchText: '',
	order: 'desc',
	page: 1,
	user: null
};

export const reducer = (state = initState, action) => {

	if (action.type === ADD_USERS) {
		return {
			...state, users:
			{
				...state.users,
				items: [...state.users.items, ...action.payload.items]
			},
			page: state.page + 1
		};
	} else if (action.type === GET_USERS) {
		return {
			...state, users: {
				total_count: action.payload.total_count,
				items: action.payload.items
			},
			page: 2
		};
	} else if (action.type === CHANGE_ORDER) {
		return { ...state, order: action.payload };
	} else if (action.type === CHANGE_SEARCH_TEXT) {
		return { ...state, searchText: action.payload };
	} else if (action.type === USER_DETAILS) {
		return { ...state, user: action.payload };
	} else {
		return state;
	}
}

export const getUsersAC = (users) => ({ type: GET_USERS, payload: users });
export const changeOrderAC = (order) => ({ type: CHANGE_ORDER, payload: order });
export const changeSearchAC = (searchText) => ({ type: CHANGE_SEARCH_TEXT, payload: searchText });
export const addUsersAC = (users) => ({ type: ADD_USERS, payload: users });
export const getUserDetails = (user) => ({ type: USER_DETAILS, payload: user });



