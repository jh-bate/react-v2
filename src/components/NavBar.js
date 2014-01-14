/** @jsx React.DOM */

var React = require('react');

var NavBar = React.createClass({

    getInitialState: function() {
        return {detail: false};
    },

    handleLogout:function(){
        this.props.logout(function(){
            self.props.onLogoutSuccess();
        });
    },
  
    getStandardNav : function(){
        return this.transferPropsTo(
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="#/group">Groups</a></li>
                    <li><a href="#/thread">Notes</a></li>
                </ul>
                <button type="button" className="btn btn-default navbar-btn" onClick={this.handleLogout}>Sign out</button>
            </nav>
        );
    },

    getDetailNav : function(){
        return this.transferPropsTo(
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#/groups">Back</a>
                </div>
            </nav>
        );
    },

    render: function() {
        if(this.state.detail){
            return this.getDetailNav();
        }
        return this.getStandardNav();
    }
});

module.exports = NavBar;