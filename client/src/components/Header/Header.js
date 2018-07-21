import React, { Component } from 'react'; 
import axios from 'axios';
import './Header.css'; 
import Wrapper from '../Wrapper';
// import Button from '@material/react-button/dist'; // /index.js is implied
import { Link } from 'react-router-dom';
//import Link


class Header extends Component {
	constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

	logout = () => {
		axios.post('/user/signout').then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.props.updateUser({
					loggedIn: false,
					hasCustomerAccount: false,
					email: null,
					userId: null
				});
			}
		}).catch(err => {
				console.log(`Logout error: ${err}`);
		});
	}

	render() {
		return (
			<nav className={this.props.page != "home"? "navbar navbar-expand-lg navbar-gradient" : "navbar navbar-expand-lg"}>
				<Wrapper>
				<a className="navbar-brand" href="/">Love Foundation</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link to="/" className="nav-link" >Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className="nav-item">
							<Link to="/about" className="nav-link">About</Link>
						</li>
						<li className="nav-item">
							<Link to="/donations" className="nav-link">Donations</Link>
						</li>
						<li className="nav-item">
							<Link to="/settings" className="nav-link" href="/settings">Settings</Link>
						</li>
						<li className="nav-item">
							{this.props.userInfo.loggedIn ? (
								<button className="nav-link disabled" onClick={this.logout}>Logout</button>
							) : (
								<Link to="/login" className="nav-link disabled">Login</Link>
							)}
						</li>
					</ul>
				</div>
				
				</ Wrapper>
			</nav>
		);
	}
}

export default Header; 