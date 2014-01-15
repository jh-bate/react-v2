/** @jsx React.DOM */

var React = require('react');

var ListNavBar = React.createClass({

    handleAction:function(){

        this.props.onActionHandled();
    },

    render: function() {
        return (
            /* jshint ignore:start */
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <button type="button" ref='actionBtn' className="btn btn-default navbar-btn pull-left" onClick={this.handleAction}>{this.props.actionName}</button>
                <p className="navbar-text text-center">{this.props.title}</p>
            </nav>
            /* jshint ignore:end */
        );
    }
});

module.exports = ListNavBar;