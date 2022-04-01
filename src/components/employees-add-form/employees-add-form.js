import './employees-add-form.css';
import {Component} from "react";

class EmployeesAddForm extends Component {
	constructor({props}) {
		super(props);
		this.state = {
			name: '',
			salary: '',
		}
	};

	onValueChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.name === '' && this.state.salary === '') return

		this.props.onAdd(this.state.name, this.state.salary);
	};

	render() {
		const {name, salary} = this.state;
		return (
			<div className="app-add-form">
				<h3>Добавьте нового сотрудника</h3>
				<form
					onSubmit={this.onSubmit}
					className="add-form d-flex">
					<input type="text"
					       className="form-control new-post-label"
					       placeholder="Как его зовут?"
					       value={name}
					       onChange={this.onValueChange} name='name'/>
					<input type="number"
					       className="form-control new-post-label"
					       placeholder="З/П в $?"
					       value={salary}
					       onChange={this.onValueChange} name='salary'/>
					<button type="submit"
					        className="btn btn-outline-light">Добавить
					</button>
				</form>
			</div>
		)
	}
}

export default EmployeesAddForm;