/**
 * @jsx React.DOM
 */


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
			</div>
		);
	}
});


function render(status) {
	React.renderComponent(
		<AppView status={status} />,
		document.getElementById('app')
	);
}


function main() {
	var socket = new WebSocket("ws://192.168.33.190:8765");
	render('connecting');

	socket.onopen = function (event) {
		render('open');
	};

	socket.onclose = function (event) {
		render('closed');
	};
}

main();
