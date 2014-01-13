/** @jsx React.DOM */
var React = require('react');

var GroupItem = React.createClass({
    render: function() {
        return this.transferPropsTo(
            <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">{this.props.name}</h4>
            </a>
        );
    }
});

module.exports = GroupItem;

