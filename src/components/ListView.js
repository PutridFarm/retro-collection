import React, {Component, useState} from 'react';
import {Button, Confirm} from 'semantic-ui-react';
import '../css/listView.css';


class ListView extends Component {

	constructor(props) {
		super(props);
		this.handleSelection = this.handleSelection.bind(this);
		this.handleHover = this.handleHover.bind(this);
		this.state = {selected: {}, hover: {}};
	}

	handleSelection(item) {
		this.setState ({selected: item});
		this.props.onClickEvent(item);
	}

	handleHover(item){
		this.setState ({hover: item});
	}

	render () {
		const selectedItem = this.state.selected;
		return (
					<React.Fragment>
						<div className="list-view">
							<div className="list-header">
								<h2>{this.props.header}</h2>
								{this.props.button}
							</div>
							<table className="list-view list">
								<tbody>
									{
										this.props.items.map(item => {
											return (
												<tr key={item.id}>
													<td onClick={()=>this.handleSelection(item)} onMouseEnter={() => this.handleHover(item)} onMouseLeave={() => this.handleHover(null)}>
														<ListItem item={item} hoverItem={this.state.hover}/>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</React.Fragment>
		);
	}
};

function ListItem(props) {
	return (
		<React.Fragment>
			<div className="list-item">
				{props.item.title}
				<DeleteButton hoverItem={props.hoverItem} item={props.item}/>
			</div>
		</React.Fragment>
	)
}

function DeleteButton(props) {
	const [open, setOpen] = useState(false);
	const [result, setResult] = useState('');

	function show(){
		setOpen(true)
	}

	async function handleConfirm(){
		setOpen(false)
		setResult('confirmed')

    const response = await fetch('/delete_game', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: props.item.id})
    })

    if (response.ok) {
        console.log('response from /delete_game!');
    }
	}

	function handleCancel(){
		setOpen(false)
		setResult('cancelled')
	}

	let button;
	if(props.hoverItem == props.item) {
		const message = "Are you sure you want to delete " + props.item.title +"?"
		button = <React.Fragment>
								<Button circular onClick={show}>-</Button>
								<Confirm
									open={open}
									content={message}
									cancelButton='Cancel'
									confirmButton='Delete'
									onCancel={handleCancel}
									onConfirm={handleConfirm}
								/>
						</React.Fragment>
	}

	return (
		<React.Fragment>
			{button}
		</React.Fragment>
	)
}

export default ListView;
