import './App.css';
import Search from './components/Search';
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1>Поиск пользователей GitHub</h1>
				<Search />
			</div>
		</Provider>
	);
}

export default App;
