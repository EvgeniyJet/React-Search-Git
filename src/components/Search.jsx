import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeSearchAC, changeOrderAC, getUserDetails } from '../store/reducer';
import { fetchGetUsersAC, fetchAddUsersAC, fetchPopupUserAC } from '../asyncActions/users'

import Popup from './Popup';

const Profile = () => {
	const dispatch = useDispatch();
	const searchText = useSelector((state) => state.searchText);
	const handleChangeSearchText = useCallback((event) => {
		dispatch(changeSearchAC(event.target.value))
	});

	const sortOrder = useSelector((state) => state.order);
	const users = useSelector((state) => state.users);
	const page = useSelector((state) => state.page);
	const userDetails = useSelector((state) => state.user);


	const handleChangeSort = useCallback(() => {
		dispatch(changeOrderAC(sortOrder === 'desc' ? 'asc' : 'desc'))
	})
	const handleSearch = useCallback(() =>
		dispatch(
			fetchGetUsersAC({ value: searchText, order: sortOrder })
		))
	const handleLoadMore = useCallback(() =>
		dispatch(fetchAddUsersAC({ value: searchText, page: page, order: sortOrder })
		))
	const handleDataUser = useCallback((login, avatar_url) =>
		dispatch(fetchPopupUserAC({ login, avatar_url })
		))
	const closePopup = useCallback(() =>
		dispatch(getUserDetails(null)
		))

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
				Сортировка количества репозиториев {sortOrder === 'desc' ? 'по убыванию' : 'по возрастанию'}
			</button>

			<div className="list">
				<div className="users">
					{users.items.map((user) => (
						<div className="user" key={user.id} onClick={() => handleDataUser(user.login, user.avatar_url)}>
							<img src={user.avatar_url} alt={user.login} />
							<p>{user.login}</p>
						</div>
					))}
				</div>
			</div>
			{(users.total_count - users.items.length > 0)
				&& <button className='btn loadMore' onClick={handleLoadMore}>Загрузить ещё</button>}
			{userDetails && <Popup user={userDetails} closePopup={closePopup} />}
		</div>
	);
}

export default Profile;
