/** @jsx React.DOM */

var React = require('react');

var GroupItemList = require('../components/GroupItemList');

var Groups = React.createClass({

	handleGroupSelection : function(){
		console.log('group selected');
	},

    render: function() {

        return (
        	/* jshint ignore:start */
        	<GroupItemList groups={this.props.userGroups} onGroupSelected={this.handleGroupSelection} />
        	/* jshint ignore:end */
        	);
    }
});

module.exports = Groups;