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
			<form className="form-inline" role="form" onSubmit={this.handleSend}>
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Send a message..." ref="message"/>
				</div>
				<button type="submit" className="btn btn-default">Send</button>
			</form>
		);
	}
})


var MessageView = React.createClass({
	render: function() {
		return (
			<li>{this.props.message}</li>
		);
	}
});


var MessageListView = React.createClass({
	render: function() {
		var messageNodes = this.props.messages.map(function(message) {
			return <MessageView message={message} />;
		});

		return (
			<div>
				<h2>Messages</h2>
				<ul className="list-unstyled">
					{messageNodes}
				</ul>
			</div>
		);
	}
});


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
				<MessageListView messages={this.props.messages} />
			</div>
		);
	}
});


function main() {
	var status = 'connecting';
	var messages = [];
	var socket;
	var sendMessage;

	var render = function() {
		React.renderComponent(
			<AppView status={status} sendMessage={sendMessage} messages={messages}/>,
			document.getElementById('app')
		);
	}

	socket = new WebSocket("ws://192.168.33.190:8765");
	sendMessage = function(message) {
		socket.send(message);
	};

	render();

	socket.onopen = function (event) {
		status = 'open';
		render();
	};

	socket.onclose = function (event) {
		status = 'closed';
		render();
	};

	socket.onmessage = function (event) {
		// console.log(message);
		messages.push(event.data);
		render();
	};
}

main();
