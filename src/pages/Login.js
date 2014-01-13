/** @jsx React.DOM */

var React = require('react');

var Login = React.createClass({

    getInitialState: function() {
        return {
            loggingIn: false,
            message: ''
        };
    },

	getSignInForm: function(){
		return (
			/* jshint ignore:start */
            <form className="form-horizontal" role="form">
                <div className="form-group">
                    <label for="inputEmail3" className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-3">
                        <input type="email" ref='emailFeild' id='inputEmail3' className="form-control" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputPassword3" className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-3">
                        <input type="password" ref='pwFeild' className="form-control" id="inputPassword3" placeholder="Password" />
                    </div>
                </div>
            	<div className="form-group">
    				<div className="col-sm-offset-2 col-sm-3">
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
        		{login}
        	</div>);
    },

    handleLogin: function(username, password) {
        var self = this;

        if (this.state.loggingIn) {
            return;
        }

        this.setState({loggingIn: true});

        var validationError = this.validate(username, password);
        if (validationError) {
            this.setState({
                loggingIn: false,
                message: validationError
            });
            return;
        }

        this.props.login(username, password, function(err) {
            if (err) {
                self.setState({
                    loggingIn: false,
                    message: err.message || 'An error occured while logging in.'
                });
                return;
            }
            self.setState({loggingIn: false});
            self.props.onLoginSuccess();
        });
    },

    validate: function(username, password) {
        if (!username && !password) {
            return 'Missing email and password.';
        }

        if (!username) {
            return 'Missing email.';
        }

        if (!password) {
            return 'Missing password.';
        }
    }
});

module.exports = Login;