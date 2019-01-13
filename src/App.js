import React, { Component } from 'react';
import Navigation from './sections/Navigation';
import Header from './sections/Header';
import AboutMe from './sections/AboutMe';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Interests from './sections/Interests';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default class App extends Component {
	
	// componentDidMount() {
	// 	$(window).resize(resetAll);
    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() > 50) {
    //             $('#back-to-top').tooltip();
    //             $('#back-to-top').fadeIn();
    //         } else {
    //             $('#back-to-top').fadeOut();
    //             $('#back-to-top').tooltip('hide');
    //         }
    //     })    
	// }

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
				<a id="back-to-top" href="/#" className="btn btn-dark btn-lg back-to-top" role="button" title="Back to the top!"
					data-toggle="tooltip" data-placement="left">
					<i className="fas fa-arrow-up"></i>
				</a>
			</div>
		);
	}
	
}