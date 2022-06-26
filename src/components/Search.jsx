import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeSearchAC, changeOrderAC } from '../store/reducer';
import { fetchGetUsersAC, fetchAddUsersAC, fetchPopupUserAC } from '../asyncActions/users'

import Popup from './Popup';

const Profile = () => {
	const dispatch = useDispatch();
	const searchText = useSelector((state) => state.searchText);

	const handleChangeSearchText = useCallback((event) => {
		dispatch(changeSearchAC(event.target.value))
		// event.preventDefault();
	});

	const sortOrder = useSelector((state) => state.order);
	const handleChangeSort = useCallback(() => {
		dispatch(changeOrderAC(sortOrder === 'desc' ? 'asc' : 'desc'))
	})

	const users = useSelector((state) => state.users);

	const page = useSelector((state) => state.page);
	const handleSearch = useCallback(() =>
		dispatch(
			fetchGetUsersAC({ value: searchText, order: sortOrder })
		)
	)

	const handleLoadMore = useCallback(() =>
		dispatch(fetchAddUsersAC({ value: searchText, page: page, order: sortOrder }))
	)

	const handleRepo = useCallback(() =>
		dispatch(fetchPopupUserAC({ login: users.login }))
	)
	const [popupUser, setPopupUser] = useState(null);
	const closePopup = useCallback(() => setPopupUser(null))

	console.log(users);
	return (
		<div>
			<div className='form' >
				<input type="text"
					value={searchText}
					onChange={handleChangeSearchText} placeholder="Search..." />
				<button className='submit' onClick={handleSearch} >GO</button>
			</div>

			<span className='count'>Найдено: {users.total_count ? users.total_count : 0}</span>

			<button className='submit' onClick={handleSearch}>Поиск</button>

			<button className="btn sort" onClick={handleChangeSort}>
				Сортировка по {sortOrder === 'desc' ? 'по возрастанию' : 'по убыванию'}
			</button>

			<div className="list">
				<div className="users">
					{users.items.map((user) => (
						<div className="user" key={user.id} onClick={() => setPopupUser(user)}>
							<img src={user.avatar_url} alt={user.login} />
							<p>{user.login}</p>
							<div className="rep">
								{

								}
							</div>
						</div>
					))}
				</div>
			</div>
			{(users.total_count - users.items.length > 0)
				&& <button className='btn loadMore' onClick={handleLoadMore}>Загрузить ещё</button>}
			{popupUser && <Popup user={popupUser} closePopup={closePopup} />}
		</div>





	);
}

export default Profile;
