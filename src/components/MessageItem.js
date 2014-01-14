/** @jsx React.DOM */
var React = require('react');

var MessageItem = React.createClass({
    render: function() {
        return this.transferPropsTo(
            <a href="#" className="list-group-item">
            	<span ref='messageWho' className="pull-left small">{this.props.who}</span>
                <p ref='messageText' className="list-group-item-text">{this.props.messageText}</p>
                <p ref='messageWhen' className="text-center small">{this.props.when}</p>
            </a>
        );
    }
});

module.exports = MessageItem;

