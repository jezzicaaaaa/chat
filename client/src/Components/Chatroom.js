import React, { Component } from 'react';
import './Chatroom.css';
import { Input, Button, Row } from 'reactstrap';
import socket from '../socket';
import Chats from './Chats';

class Chatroom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			username: '',
			roomName: '',
			friend: '',
			friends: []
		};
	}
	prompUserData(room) {
		let user = prompt('what is your name?');
		this.setState({ username: user });
		socket.emit('username', user);
		socket.emit('join', room);
	}

	getData = () => {
		const user = this.props.location.username;
		const room = this.props.location.roomName;
		this.setState({ username: user, roomName: room });
		if (user === '') {
			this.prompUserData(room);
			return;
		}
	};

	joined = () => {
		return <Chats friend={this.state.friend} />;
	};

	componentDidMount() {
		this.getData();
		socket.on('broadcast', (data) => {
			this.setState({ friend: data, friends: [ ...this.state.friends, data ] });
		});
	}
	render() {
		return (
			<div className="Chatroom">
				<Row>Hello, {this.state.username}</Row>
				<Row>
					<div id="messageContainer">
						{this.state.friend !== '' ? <p>{this.state.friend} has joined the chat.</p> : null}
						{this.joined}
					</div>
				</Row>
				<form id="sendContainer">
					<Input
						type="text"
						name="text"
						id="messageInput"
						placeholder="Type your message here:"
						value={this.state.message}
						// onChange={this.handleMessage}
						// onKeyPress={this.handleKeyPress}
					/>
					<Button color="primary">Send</Button>
				</form>
			</div>
		);
	}
}
export default Chatroom;

// import React, { Component } from 'react';
// import './Chatroom.css';
// import { Input, Button, Row } from 'reactstrap';
// import socket from '../socket';
// import Chat from './Chats';

// class Chatroom extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			message: '',
// 			username: '',
// 			roomName: '',
// 			rooms: [],
// 			isTyping: false,
// 			friend: ''
// 		};
// 	}
// 	handleMessage = (e) => {
// 		socket.emit('typing', this.state.roomName);
// 		this.setState({ message: e.target.value, isTyping: true });
// 	};

// 	sendMessage = (e) => {
// 		e.preventDefault();
// 		let msg = { message: this.state.message, sender: this.state.username };
// 		socket.emit('sendMessage', msg);
// 	};

// 	getData = () => {
// 		const user = this.props.location.username;
// 		const room = this.props.location.roomName;
// 		this.setState({ username: user, roomName: room });
// 		if (user === '') {
// 			this.prompUserData(room);
// 			return;
// 		}
// 	};

// 	listenTyping = () => {
// 		socket.on('typing', (data) => {
// 			console.log(data.username, 'is typing');
// 		});
// 	};
// 	handleKeyPress = (e) => {
// 		socket.emit('typing');
// 		this.setState({ isTyping: true });
// 	};

// 	prompUserData(room) {
// 		let user = prompt('what is your name?');
// 		this.setState({ username: user });
// 		socket.emit('username', user);
// 		socket.emit('join', room);
// 		socket.on('joined_room', (username) => {
// 			console.log(username);
// 		});
// 	}
// 	componentDidMount() {
// 		this.getData();
// 	}

// 	render() {
// 		return (
// 			<div className="Chatroom">
// 				<Row>Hello, {this.state.username}</Row>
// 				<Row>
// 					<div id="messageContainer">
// 						<Chat sender={this.state.username} message={this.state.message} />
// 					</div>
// 				</Row>
// 				<form id="sendContainer">
// 					<Input
// 						type="text"
// 						name="text"
// 						id="messageInput"
// 						placeholder="Type your message here:"
// 						value={this.state.message}
// 						onChange={this.handleMessage}
// 						onKeyPress={this.handleKeyPress}
// 					/>
// 					<Button color="primary" onClick={this.sendMessage}>
// 						Send
// 					</Button>
// 				</form>
// 			</div>
// 		);
// 	}
// }
// export default Chatroom;
