var React = require('react');

var LinkedinLogin = React.createClass({

    componentDidMount: function() {
        var liRoot = document.createElement('div');
        liRoot.id = 'linkedin-root';

        document.body.appendChild(liRoot);

        (function(d, s, id) {
            const element = d.getElementsByTagName(s)[0];
            const ljs = element;
            var js = element;
            if (d.getElementById(id)) {
                return; }
            js = d.createElement(s);
            js.id = id;
            js.src = '//platform.linkedin.com/in.js';
            js.text = 'api_key: 86vkjzfew3pwlx';
            ljs.parentNode.insertBefore(js, ljs);
        }(document, 'script', 'linkedin-sdk'));
    },

    callbackFunction: function() {
        winodw.IN.API.Profile("me").result(function(r) {
            console.log(r);
        });
    },

    handleClick: function(e) {
        e.preventDefault();
        window.IN.User.authorize(this.callbackFunction, '');
    },

    render: function() {
        return ( 
            <div>
            < button onClick = { this.handleClick }
            className = { "button social " + this.props.name.toLowerCase() + " " + this.props.visibility } > { this.props.text } < i className = { "fi-social-" + this.props.name.toLowerCase() }
            /></button >
            </div>
        );
    }
});
module.exports = LinkedinLogin;