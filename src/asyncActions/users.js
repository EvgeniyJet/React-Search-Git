import { getUsersAC } from "../store/reducer";
const USER_PER_PAGE = 20;
const URL = 'https://api.github.com/';

export const fetchGetUsersAC = ({ value, page, order }) => {

	return (dispatch) => {
		fetch(`${URL}search/users?q=${value}
									&per_page=${USER_PER_PAGE}
									&page=${page}
									&sort=repositories
									&order=${order}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})
			.then(resp => resp.json())
			.then(json => { dispatch(getUsersAC(json)) });
	}
}