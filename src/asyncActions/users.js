import { getUsersAC, addUsersAC, getUserDetails } from "../store/reducer";
const USER_PER_PAGE = 20;
const URL = 'https://api.github.com/';

export const fetchGetUsersAC = ({ value, order }) => {

	return (dispatch) => {
		fetch(`${URL}search/users?q=${value}
									&per_page=${USER_PER_PAGE}
									&page=1
									&sort=repositories
									&order=${order}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})
			.then(resp => resp.json())
			.then(json => { dispatch(getUsersAC(json)) });
	}
}

export const fetchAddUsersAC = ({ value, page, order }) => {

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
			.then(json => { dispatch(addUsersAC(json)) });
	}
}

export const fetchPopupUserAC = ({ login, avatar_url }) => {
	return (dispatch) => {
		const urls = [
			`${URL}users/${login}/following`,
			`${URL}users/${login}/followers`,
			`${URL}users/${login}/repos`,
		];
		const requests = urls.map(url => fetch(url, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		}))

		return Promise.all(requests)
			.then(responses => Promise.all((responses.map(r => r.json()))))
			.then(json => {
				const [following, followers, repos] = json;
				dispatch(getUserDetails({ login, avatar_url, following, followers, repos }))
			})
	}
}