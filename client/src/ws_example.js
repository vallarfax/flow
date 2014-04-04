/**
 * @jsx React.DOM
 */


var MessageFormView = React.createClass({
	handleSend: function() {
		var message = this.refs.message.getDOMNode().value.trim();

		// Send message to server
		this.props.sendMessage(message);

		// Clear field
		this.refs.message.getDOMNode().value = '';
		return false;
	},
	render: function() {
		return (
			<form className="form-inline" role="form">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="message" ref="message"/>
				</div>
				<button type="button" className="btn btn-default" onClick={this.handleSend}>Send</button>
			</form>
		);
	}
})


var ConnectionStatusView = React.createClass({
	render: function() {
		return (
			<h1>{this.props.status}</h1>
		);
	}
});


var AppView = React.createClass({
	render: function() {
		return (
			<div className='container'>
				<ConnectionStatusView status={this.props.status} />
				<MessageFormView sendMessage={this.props.sendMessage} />
			</div>
		);
	}
});


function render(status, sendMessage) {
	React.renderComponent(
		<AppView status={status} sendMessage={sendMessage} />,
		document.getElementById('app')
	);
}


function main() {
	var socket = new WebSocket("ws://192.168.33.190:8765");
	var sendMessage = function(message) {
		socket.send(message);
	};

	render('connecting', sendMessage);

	socket.onopen = function (event) {
		render('open', sendMessage);
	};

	socket.onclose = function (event) {
		render('closed', sendMessage);
	};
}

main();
