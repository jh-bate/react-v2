/** @jsx React.DOM */
var React = require('react');

var GroupItem = React.createClass({
    render: function() {
        return this.transferPropsTo(
            <a href="#" className="list-group-item">
            	<span ref='noteWhen' className="small pull-right">{this.props.when}</span>
                <h4 ref='groupName' className="list-group-item-heading">{this.props.name}</h4>
                <p ref='noteSummary' className="list-group-item-text">{this.props.latestNoteSummary}</p>
            </a>
        );
    }
});

module.exports = GroupItem;

