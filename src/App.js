import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import Navigation from './sections/Navigation';
import Header from './sections/Header';
import AboutMe from './sections/AboutMe';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Interests from './sections/Interests';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Experience from './sections/Experience';

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			tooltipOpen: false,
			showIcon: false
		};
	}

	toggle = () => {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}

	componentDidMount() {
		window.addEventListener("scroll", (ev) => {
			if (window.scrollY > 50) {
				if (!this.state.showIcon) {
					this.setState({
						showIcon: true
					});
				}
			} else {
				if (this.state.showIcon) {
					this.setState({
						showIcon: false
					});
				}
			}
		});
	}

	render() {
		return (
			<div>
				<Navigation></Navigation>
				<Header></Header>
				<main>
					<div className="content">
						<AboutMe></AboutMe>
						<Skills></Skills>
						<Experience></Experience>
						<Projects></Projects>
						<Interests></Interests>
						<Contact></Contact>
					</div>
				</main>
				<Footer></Footer>
				{this.state.showIcon &&
					<div>
						<a id="back-to-top" href="/#" className="back-to-top btn btn-dark btn-lg" role="button">
							<i className="fas fa-arrow-up"></i>
						</a>
						<Tooltip id="back-to-top" placement="right" isOpen={this.state.tooltipOpen} target="back-to-top" toggle={this.toggle}>
							Back to the top!
						</Tooltip>
					</div>
				}
			</div>
		);
	}

}