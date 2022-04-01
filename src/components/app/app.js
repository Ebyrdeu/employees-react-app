import {Component} from "react";
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'Her. JR', salary: 800, increase: false, rise: true, id: 0},
				{name: 'Hur BR', salary: 900, increase: false, rise: false, id: 1},
				{name: 'Har SR', salary: 1800, increase: false, rise: false, id: 2},
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 3;
	}

	deleteItem = id => this.setState(({data}) => ({data: data.filter(e => e.id !== id)}));
	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			rise: false,
			id: this.maxId++
		};
		this.setState(({data}) => ({data: [...data, newItem]}));
	}
	onToggleIncrease = (id) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) return {...item, increase: !item.increase}
				return item
			})
		}))
	};

	onToggleRise = (id) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) return {...item, rise: !item.rise}
				return item
			})
		}))
	};

	searchEmp = (items, term) => {
		if (term.length === 0) return items;

		return items.filter(item => {
			return item.name.indexOf(term) > -1;
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}

	onFilterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				return items.filter(item => item.rise);
			case '1000+' :
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	}
	onUpdateFilterPost = (filter) => {
		this.setState({filter})
	}

	render() {
		const {data, term, filter} = this.state;
		const employees = data.length;
		const bonus = data.filter(e => e.increase).length;
		const visibleData = this.onFilterPost(this.searchEmp(data, term), filter);
		return (
			<div className="app">
				<AppInfo
					employees={employees}
					bonus={bonus}
				/>

				<div className="search-panel">
					<SearchPanel
						onUpdateSearch={this.onUpdateSearch}/>
					<AppFilter filter={filter}
					           onUpdateFilterPost={this.onUpdateFilterPost}/>
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleIncrease={this.onToggleIncrease}
					onToggleRise={this.onToggleRise}
				/>
				<EmployeesAddForm
					data={data}
					onAdd={this.addItem}
				/>
			</div>
		);
	}
}

export default App;
