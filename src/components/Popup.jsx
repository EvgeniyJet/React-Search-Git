import React from 'react';

const Popup = ({ user, closePopup }) => {

	return (
		<div className='popup-overlay'>
			<div className="popup-container">
				<div className="close-btn" onClick={closePopup}>✕</div>
				<div className="popup-inner">

					<img src={user.avatar_url} alt="" />
					<h2>{user.login}</h2>
					<ul className="user-list">
						<li>Количество репозиториев: <span>{user.repos.length}</span></li>
						<li>Количество подписок: <span>{user.following.length}</span></li>
						<li>Количество подписчиков: <span>{user.followers.length}</span></li>
					</ul>
				</div>
			</div>

		</div>
	);
}

export default Popup;
