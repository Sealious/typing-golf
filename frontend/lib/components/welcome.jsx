var React = require("react");

var TypingGolf = require("../typing-golf-components.js");

var Welcome = React.createClass({
	getInitialState: function() {
        return {
            showCheatsheet: false
        };
    },
    coverCheatSheet: function(e) {
        var new_value = (this.state.showCheatsheet == true) ? false : true;
        this.setState({ showCheatsheet : new_value });
		e.preventDefault();
    },
	render: function(){
		return (
			<div className="content welcome">
			<TypingGolf.Cheatsheet
                    showCheatsheet={this.state.showCheatsheet}
                    coverCheatsheet={this.coverCheatSheet}/>
			<h2>Welcome, typist!</h2>
			<p> Have you noticed how much time during the day you spend on typing words? Does this process seem <strong>tedious</strong> and/or <strong>tiresome</strong>? If so, it might be the case that you're not taking advantage of all the keyboard shortcuts that your operating system provides.
			</p>
			<h3>Did you know?</h3>
			<p>
				There are <a href="#" onClick={this.coverCheatSheet}>over 20 keyobard shortcuts</a> that you can use to increase your text-based productivity. They work almost everywhere: in your browser's  address bar, in your word processing software, in File&nbsp;Explorer... You name it!
			</p>
			<h3>Learn by doing</h3>
			<p>
				<a href="https://www.sealcode.org">Sealcode.org</a>'s members have prepared for you a set of puzzles: solving them requires a thorough understanding of text-editing keyboard shortcuts. The less keystrokes you use, the better! Whenever you feel stuck, feel free to press the <code className="q">?</code> button in the lower-right corner.
			</p>
			<h3>Good Luck! 🏌</h3>
			</div>
		)
	}
});

module.exports = Welcome;