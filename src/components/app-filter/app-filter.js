import "./app-filter.css";


const AppFilter = (props) => {
	const btnData = [
		{name: 'all', label: 'all employees'},
		{name: 'rise', label: 'Stared employees'},
		{name: '1000+', label: 'Salary 1000+'}
	];

	const buttons = btnData.map(({name, label}) => {
		const active = props.filter === name;
		const clazz = active ? 'btn-light' : 'btn-outline-light'
		return (
			<button type="button"
			        className={"btn " +  clazz}
			        key={name}
			onClick={() => props.onUpdateFilterPost(name)}>{label}
			</button>
		)
	})

	return (
		<div className="btn-group">
			{buttons}
		</div>
	)
}


export default AppFilter;