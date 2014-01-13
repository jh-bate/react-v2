/** @jsx React.DOM */

var React = require('react');

var Login = React.createClass({


	getSignInForm: function(){
		return (
			/* jshint ignore:start */
            <form className="form-horizontal" role="form">
            	<div className="form-group">
    				<div className="col-sm-offset-2 col-sm-10">
      					<a type="submit" className="btn btn-default" ref='loginBtn' onClick={this.props.onLogin}>Sign in</a>
    				</div>
  				</div>
            </form>
            /* jshint ignore:end */
		);
	},

    render: function() {

    	var login = this.getSignInForm();

        return (
        	<div className='content'>
        		<h1>Will be the login page</h1>
        		{login}
        	</div>);
    }
});

module.exports = Login;