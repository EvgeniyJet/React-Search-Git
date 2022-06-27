import { reducer, addUsersAC, getUserDetails } from './reducer';
// import React from 'react';
it('length of users should be incremented', () => {
	// 1. test data
	let action = addUsersAC({
		items: ['user']
	});
	const state = {
		users: {
			total_count: null,
			items: []
		}
	};
	// 2. action
	let newState = reducer(state, action)

	// 3. expectation
	expect(newState.users.items.length).toBe(1);
})

it('Добавление данных для отдельного юзера', () => {
	// 1. test data
	let data = {
		login: 'evgeniy',
		avatar_url: 'url',
		following: ['jet', 'jet'],
		followers: ['pa', 'pa'],
		repos: ['jetpa', 'jetpa']
	};
	let action = getUserDetails(data);
	const state = {
		users: {
			total_count: null,
			items: []
		}
	};
	// 2. action
	let newState = reducer(state, action)

	// 3. expectation
	expect(newState.user).toBe(data);
})


it('При загрузке дополнительных юзеров увеличивается счётчик страниц', () => {
	// 1. test data
	let action = addUsersAC({
		items: ['user']
	});
	const state = {
		users: {
			items: []
		},
		page: 1
	};
	// 2. action
	let newState = reducer(state, action)

	// 3. expectation
	expect(newState.page).toBe(2);
})