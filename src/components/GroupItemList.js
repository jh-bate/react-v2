/** @jsx React.DOM */
var React = require('react');

var GroupItem = require('./GroupItem');

var GroupItemList = React.createClass({

	summaryForMessage: function(message){

	},

	mostRecentMessage: function(messages){
		if(messages){
			return messages[0];
		}
		return {};
	},

	niceTime: function(time){

	},

	renderItems: function(){

		var items = this.props.groups.map(function(group, i) {

			var mostRecentMessage = this.mostRecentMessage(group.messages);		

            return (
            	/* jshint ignore:start */
                <GroupItem
                    onClick={this.props.onGroupSelected.bind(this.props, i)}
                    key={group.groupid} 
                    name={group.name}
                    latestNoteSummary={this.summaryForMessage(mostRecentMessage.messagetext)}
                    when={this.niceTime(mostRecentMessage.timestamp)}/>
                /* jshint ignore:end */    
            );
        }.bind(this));

        return items;
	},

    render: function() {
        var items = this.renderItems();

        return (
        	/* jshint ignore:start */
            <div className="list-group">
                {items}
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = GroupItemList;

