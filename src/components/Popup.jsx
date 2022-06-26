import React from 'react';
import { fetchGetUsersAC, fetchPopupUserAC } from '../asyncActions/users'
const Popup = ({ user, closePopup }) => {

	// templateItem(data) {
	// 	let userItem = '';
	// 	data.forEach(user => {
	// 		userItem += `<li class="user-list-item">
	// 							<a href="${user.html_url}" class="user-list-link">${user.login ? user.login : user.name}</a>
	// 							</li>`;
	// 	});
	// 	return userItem
	// }

	return (
		<div className='popup-overlay'>
			<div className="popup-container">
				<div className="close-btn" close={closePopup}>✕</div>
				<div className="popup-inner">

					<img src={user.avatar_url} alt="" />
					<h2>{user.login}</h2>
					<ul className="user-list">{user.repos}</ul>
				</div>
			</div>

		</div>
	);
}

export default Popup;
