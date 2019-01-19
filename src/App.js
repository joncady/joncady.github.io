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

export default class App extends Component {

	constructor() {
		this.state = {
			tooltipOpen: false
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

				// $('#back-to-top').tooltip();
				// $('#back-to-top').fadeIn();

			} else {
				// $('#back-to-top').fadeOut();
				// $('#back-to-top').tooltip('hide');
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
						<Projects></Projects>
						<Interests></Interests>
						<Contact></Contact>
					</div>
				</main>
				<Footer></Footer>
				<Tooltip id="back-to-top" href="/#" className="btn btn-dark btn-lg back-to-top" role="button" title="Back to the top!"
					data-toggle="tooltip" data-placement="left">
					<i className="fas fa-arrow-up"></i>
				</Tooltip>
			</div>
		);
	}

}