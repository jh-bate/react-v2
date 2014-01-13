/** @jsx React.DOM */

var React = require('react');

var Login = React.createClass({
    render: function() {
        return (
        	<div className='content'>
        		<h1>Will be the login page</h1>
        		<a className='btn' onClick={this.props.onLoginSuccess}>Login me in</a>
        	</div>);
    }
});

module.exports = Login;