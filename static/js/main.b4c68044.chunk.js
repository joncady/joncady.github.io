(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,a,t){e.exports=t.p+"static/media/react.580ffd26.png"},,function(e,a,t){e.exports=t(30)},,,,,,,,function(e,a,t){},,,function(e,a,t){e.exports=t.p+"static/media/otherPic.718eec11.jpg"},function(e,a,t){e.exports=t.p+"static/media/firebase.e642c755.png"},function(e,a,t){e.exports=t.p+"static/media/sql.21812f6d.png"},function(e,a,t){e.exports=t.p+"static/media/node.f8dab57d.png"},function(e,a,t){e.exports=t.p+"static/media/java.4eb1819d.png"},function(e,a,t){e.exports=t.p+"static/media/python.ca2ceddc.png"},function(e,a,t){e.exports=t.p+"static/media/r.060a1e7e.png"},function(e,a,t){e.exports=t.p+"static/media/bs.fb324fa2.png"},function(e,a,t){e.exports=t.p+"static/media/api.2f282e92.png"},function(e,a,t){e.exports=t.p+"static/media/pi.e2b8c714.jpeg"},function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(8),c=t.n(l),o=(t(15),t(17),t(1)),s=t(2),i=t(4),m=t(3),d=t(5),u=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"checkScreen",value:function(){console.log("toggle")}},{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar navbar-expand-md fixed-top navbar-dark bg-dark"},r.a.createElement("a",{className:"navbar-brand",href:"#header"},"Jonathan Cady"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarText"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item active"},r.a.createElement("a",{className:"nav-link",href:"#header"},"Home",r.a.createElement("span",{className:"sr-only",onClick:this.checkScreen()},"(current)"))),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#about-me",onClick:this.checkScreen()},"About Me")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#skills",onClick:this.checkScreen()},"Skills")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#my-projects",onClick:this.checkScreen()},"My Projects")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#interests",onClick:this.checkScreen()},"My Interests")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#contact",onClick:this.checkScreen()},"Contact")))))}}]),a}(n.Component),p=function(e){function a(){var e;return Object(o.a)(this,a),(e=Object(i.a)(this,Object(m.a)(a).call(this))).addLetters=function(a){var t=e.state.index;t<a.length?e.setState({word:e.state.word+a.charAt(t),index:t+1}):clearTimeout(e.state.timer)},e.state={timer:null,helloTimer:null,index:null,word:""},e}return Object(d.a)(a,e),Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this,a=setInterval(function(){e.addLetters(" I'm Jonathan Cady")},100);this.setState({timer:a,index:0})}},{key:"conditions",value:function(e,a,t,n){return a>n-10||(e<10||e>t-30)}},{key:"produceRandom",value:function(e){return Math.floor(Math.random()*e)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,r.a.createElement("div",{id:"header","aria-label":"says hello in many different languages"},r.a.createElement("div",{id:"top"},r.a.createElement("h1",{id:"me"},"Hi. ",this.state.word)))),r.a.createElement("div",{id:"about-hello",className:"collapse mt-3"},r.a.createElement("p",{className:"card card-body card-size"},'I designed the "hello" module to say hello in a variety of languages. I am interested in languages and I try to find ways to pair my love for coding and language!')),r.a.createElement("div",{className:"dropdown show"},r.a.createElement("div",{className:"btn btn-dark-outline dropdown-toggle",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}),r.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"dropdownMenuLink"},r.a.createElement("button",{className:"dropdown-item",id:"reset",onClick:this.resetAll},"reset"),r.a.createElement("button",{id:"hello-button",className:"dropdown-item","data-toggle":"collapse","data-target":"#about-hello","aria-expanded":"false","aria-controls":"about-hello"},"about hellos"))))}}]),a}(n.Component),h=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("section",{id:"about-me"},r.a.createElement("div",{className:"title"},r.a.createElement("hr",null),r.a.createElement("h2",null,"About Me"),r.a.createElement("hr",null)),r.a.createElement("div",{id:"about"},r.a.createElement("div",{id:"intro",className:"lead"},r.a.createElement("p",null,"I am a ",r.a.createElement("span",null,"third year student")," studying Informatics at the University of Washington Seattle! What is Informatics exactly? Well, Informatics designs technology for the good of people. Follow this ",r.a.createElement("a",{href:"https://ischool.uw.edu/programs/informatics/what-is-informatics"},"link"),"to learn more."),r.a.createElement("p",null,"I am primarily a ",r.a.createElement("span",null,"front-end web developer")," with experience using JavaScript frameworks like React, Express, Node, etc. I have a background in Java and Python and would like to learn more and hopefully create my own software."),r.a.createElement("p",null,"Linguistics is my minor and I enjoy talking about language and how it relates to coding.")),r.a.createElement("div",{className:"picture-container"},r.a.createElement("img",{id:"profile",src:t(20),alt:"Jonathan Cady profile"}))))}}]),a}(n.Component),E=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("section",{id:"skills"},r.a.createElement("hr",null),r.a.createElement("h2",null,"Skills"),r.a.createElement("hr",null),r.a.createElement("div",{id:"logo-space"},r.a.createElement("a",{href:"https://reactjs.org/"},r.a.createElement("img",{src:t(7),alt:"React"})),r.a.createElement("a",{href:"https://firebase.google.com"},r.a.createElement("img",{src:t(21),alt:"Firebase"})),r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/SQL"},r.a.createElement("img",{src:t(22),alt:"SQL"})),r.a.createElement("a",{href:"https://nodejs.org"},r.a.createElement("img",{src:t(23),alt:"Node"})),r.a.createElement("a",{href:"https://www.java.com"},r.a.createElement("img",{src:t(24),alt:"Java"})),r.a.createElement("a",{href:"https://www.python.org/"},r.a.createElement("img",{src:t(25),alt:"Python"})),r.a.createElement("a",{href:"https://www.r-project.org/"},r.a.createElement("img",{src:t(26),alt:"R"}))))}}]),a}(n.Component),b=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("section",{id:"my-projects"},r.a.createElement("hr",null),r.a.createElement("h2",null,"My Projects"),r.a.createElement("hr",null),r.a.createElement("div",{id:"projects",className:"mt-5"},r.a.createElement("div",{id:"web-dev"},r.a.createElement("h3",null,"Web Development"),r.a.createElement("div",{className:"big-box"},r.a.createElement("a",{className:"rounded project-card",href:"projects/grocery_list_project"},r.a.createElement("div",{className:"boxes rounded",id:"project-one"},r.a.createElement("p",null,"Grocery List Project (Javascript, PHP, SQL)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"developed")," a grocery list app using a personal SQL server and PHP connection to interface with it.")),r.a.createElement("a",{className:"rounded project-card",href:"https://jit98.shinyapps.io/BE-shrug/"},r.a.createElement("div",{className:"boxes rounded",id:"project-two"},r.a.createElement("p",null,"Yelp Business App (R, Shiny, Yelp API)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"collaborated")," with a team to create a web app that utilizes the Yelp API to present information on businesses.")),r.a.createElement("a",{className:"rounded project-card",href:"projects/news/"},r.a.createElement("div",{className:"boxes rounded",id:"project-three"},r.a.createElement("p",null,"News at a Glance (JavaScript, News API)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"call")," the News API in this project to create a quick look at the top news stories of the day.")),r.a.createElement("a",{className:"rounded project-card",href:"https://github.com/joncady/rmpUW"},r.a.createElement("div",{className:"boxes rounded",id:"project-one"},r.a.createElement("p",null,"Rate My Professor MyPlanExtension (CSS, JavaScript, PHP)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"designed")," a Chrome extension that displays the professor's RateMyProfessor score next to their className.")),r.a.createElement("a",{className:"rounded project-card",href:"projects/dubhacks/landing.html"},r.a.createElement("div",{className:"boxes rounded",id:"project-two"},r.a.createElement("p",null,"FeelingFeed (JavaScript, Bootstrap, PHP)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"developed")," a full, dynamic website with my teammates at a Hackathon.")),r.a.createElement("a",{className:"rounded project-card",href:"https://info340b-a18.github.io/react-project-music-viz/"},r.a.createElement("div",{className:"boxes rounded",id:"project-three"},r.a.createElement("p",null,"SpotiViz (React, Node)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"constructed")," a React app with a classNamemate that visualizes an album timeline using the Spotify API")),r.a.createElement("a",{className:"rounded project-card",href:"https://joncady.github.io/help.me/"},r.a.createElement("div",{className:"boxes rounded",id:"project-one"},r.a.createElement("p",null,"help.me (React, Firebase)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"collorated")," with a team during a hackathon to create an emotional support chat bot that has user authentication")),r.a.createElement("a",{className:"rounded project-card",href:"https://students.washington.edu/joncady/cv/"},r.a.createElement("div",{className:"boxes rounded",id:"project-two"},r.a.createElement("p",null,"Basic CV Example (JavaScript, Node, Express)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"connected")," my simple front-end, which sends a photo, and my Express back-end, which forwards it to a Microsoft Vision API")))),r.a.createElement("div",{id:"software-dev"},r.a.createElement("h3",null,"Software Development"),r.a.createElement("div",{className:"big-box"},r.a.createElement("a",{className:"rounded project-card",href:"https://github.com/joncady/scoreboard_and_overlays"},r.a.createElement("div",{id:"project-one",className:"boxes rounded"},r.a.createElement("p",null,"Stream Editor Python Program (Python)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"created")," a Python program that outputs an XML file that can be easily interfaced by a stream overlay.")),r.a.createElement("a",{className:"rounded project-card",href:"https://github.com/joncady/python_web_scraping"},r.a.createElement("div",{id:"project-two",className:"boxes rounded"},r.a.createElement("p",null,"Wikipedia and Lyrics Scraping - ",r.a.createElement("em",null,"In Progress")," (Python)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"scrape")," public websites and return interesting information based on a user request.")),r.a.createElement("a",{className:"rounded project-card",href:"#software-dev"},r.a.createElement("div",{id:"project-three",className:"boxes rounded"},r.a.createElement("p",null,"Faceboook Messenger Chatbot - ",r.a.createElement("em",null,"In Progress")," (Python)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"linked")," my Faceboook account to a Python package that enacts various commands based on received messages.")),r.a.createElement("a",{className:"rounded project-card",href:"https://github.com/joncady/highlight_generator"},r.a.createElement("div",{id:"project-one",className:"boxes rounded"},r.a.createElement("p",null,"Highlight Generator (Python)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"utilize")," moviepy to create a program that combines video clips and adds music.")))),r.a.createElement("div",{id:"mobile-dev"},r.a.createElement("h3",null,"Mobile Development"),r.a.createElement("div",{className:"big-box"},r.a.createElement("a",{className:"rounded project-card",href:"https://github.com/joncady/monitoodApp"},r.a.createElement("div",{id:"project-one",className:"boxes rounded"},r.a.createElement("p",null,"Monitood: Monitor your Food (React Native)")),r.a.createElement("div",{className:"project-info"},"I ",r.a.createElement("em",null,"designed")," the front-end of a React Native app that stores user information in a Python back-end."))))))}}]),a}(n.Component),f=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("section",{id:"interests"},r.a.createElement("hr",null),r.a.createElement("h2",null,"My Interests"),r.a.createElement("hr",null),r.a.createElement("div",null,r.a.createElement("ul",{className:"list-unstyled"},r.a.createElement("li",{className:"media mb-3"},r.a.createElement("img",{src:t(27),alt:"Beautiful Soup"}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h5",{className:"mt-0 mb-1"},"Web Scraping"),"I have a passion for using technologies to scrape (or data mine) various websites! I have used based Python packages like requests and Beautiful Soup to retrieve and process webpages. For more complicated pages (with dynamic JavaScript), I use Selenium. This can simulate a user logging into a page and loading it normally. Scraping can also be done in PHP, and more importantly JavaScript on the server side using Cheerio and Express.")),r.a.createElement("li",{className:"media mb-3"},r.a.createElement("img",{src:t(28),alt:"API"}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h5",{className:"mt-0 mb-1"},"Personal APIs"),"When unable to find an API to do the job, I create my own! This is in the form of pulling local content on a server using PHP, or invoking other requests using Express. For various projects, I have developed simple REST APIs that assist for my front-end, either as a content generator or for authorization. Simple Express servers can be deployed to hosting services, like Heroku, and used as a public REST API!")),r.a.createElement("li",{className:"media mb-3"},r.a.createElement("img",{src:t(29),alt:"React"}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h5",{className:"mt-0 mb-1"},"Internet of Things"),"I've recently been fascinated with Internet of Things (IoT) technology! Small devices such as Raspberry Pis, or Arduinos can do really cool things. My favorite trick I've done so far is setting up a server on my Raspberry Pi and having the Pi speak by using text-to-speech (from a HTTP request). Paired with Node, an Arduino can also become a smart device! Using Node modules that have been written to interact with an Arduino, you can set up your own wifi-enabled devices. I hope to showcase some of projects with IoT here as well!")),r.a.createElement("li",{className:"media"},r.a.createElement("img",{src:t(7),alt:"React"}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h5",{className:"mt-0 mb-1"},"React Development - My Future!"),"React is one of my new-found passions! I recently learned the basics in my courses and now I'm able to make powerful single page applications that can have user authentication and a real-time database (using Firebase!). I hope to develop a useful React app in the future that is scalable and dynamic, I just need an idea! My goal is to combine my other passions to create an app that uses React for the front-end, a Python scraping back-end, and then Firebase for user storage.")))))}}]),a}(n.Component),v=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("section",{id:"contact"},r.a.createElement("hr",null),r.a.createElement("h2",null,"Contact"),r.a.createElement("hr",null),r.a.createElement("p",{className:"mt-5"},"If you would like to reach out to me, email works well!"),r.a.createElement("address",null,r.a.createElement("a",{href:"https://github.com/joncady"},r.a.createElement("div",{className:"contact-container"},r.a.createElement("i",{className:"fab fa-github fa-lg"}))),r.a.createElement("a",{href:"mailto:joncady@uw.edu"},r.a.createElement("div",{id:"email",className:"contact-container"},r.a.createElement("i",{className:"fas fa-envelope fa-lg"})),r.a.createElement("div",{id:"written"},r.a.createElement("span",null,r.a.createElement("strong",null,"joncady@uw.edu")))),r.a.createElement("a",{href:"https://www.linkedin.com/in/jonathanrcady/"},r.a.createElement("div",{className:"contact-container"},r.a.createElement("i",{className:"fab fa-linkedin fa-lg"})))))}}]),a}(n.Component),g=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("footer",null,r.a.createElement("p",{id:"footer"},"Designed by Jonathan Cady, 2018",r.a.createElement("br",null),"(with a little help from ",r.a.createElement("a",{href:"https://getbootstrap.com/"},"bootstrap"),")",r.a.createElement("br",null),"All credit for the logos go to their respective owners."))}}]),a}(n.Component),y=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(u,null),r.a.createElement(p,null),r.a.createElement("main",null,r.a.createElement("div",{className:"content"},r.a.createElement(h,null),r.a.createElement(E,null),r.a.createElement(b,null),r.a.createElement(f,null),r.a.createElement(v,null))),r.a.createElement(g,null),r.a.createElement("a",{id:"back-to-top",href:"/#",className:"btn btn-dark btn-lg back-to-top",role:"button",title:"Back to the top!","data-toggle":"tooltip","data-placement":"left"},r.a.createElement("i",{className:"fas fa-arrow-up"})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[9,2,1]]]);
//# sourceMappingURL=main.b4c68044.chunk.js.map