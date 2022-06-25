import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeSearchAC, changeOrderAC } from '../store/reducer';
import { fetchGetUsersAC } from '../asyncActions/users'
import './search.css';

const Profile = () => {
	const dispatch = useDispatch();
	const searchText = useSelector((state) => state.searchText);

	const handleChangeSearchText = useCallback((event) => {
		dispatch(changeSearchAC(event.target.value))
	});

	const sortOrder = useSelector((state) => state.order);
	const handleChangeSort = useCallback(() => {
		dispatch(changeOrderAC(sortOrder === 'desc' ? 'asc' : 'desc'))
	})

	const users = useSelector((state) => state.users);

	const page = useSelector((state) => state.page);
	const handleSearch = useCallback(() =>
		dispatch(
			fetchGetUsersAC({ value: searchText, page: page, order: sortOrder })
		)
	)

	return (
		<div>
			<input type="text" value={searchText} onChange={handleChangeSearchText} />
			<button className='btn search' onClick={handleSearch}>Поиск</button>
			<button className="btn" onClick={handleChangeSort}>
				Сортировка по {sortOrder === 'desc' ? 'по возрастанию' : 'по убыванию'}
			</button>
			<span>{users.total_count}</span>
			<div className="list">
				<ul className="users">
					{users.items.map((user) => (
						<li>user</li>
					))}
				</ul>
			</div>
			{/* <button className='btn loadMore' onClick={handleLoadMore}>Загрузить ещё</button> */}
		</div>





	);
}

export default Profile;
