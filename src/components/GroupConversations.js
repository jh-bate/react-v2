/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var GroupItem = require('./GroupItem');

var GroupConversations = React.createClass({

	summaryForMessage: function(messageText){
		//return the first 10 words or less
        var summary = messageText;

        if(messageText && messageText.split(' ').length > 10){
            //do we have more than ten words?
            summary = messageText.split(' ').slice(0,10).join(' ');
            summary += ' ...';
        }
        return summary;
	},

	mostRecentMessage: function(messages){
		if(messages){
			var latest =  _.sortBy(messages, function (message) {
				return message.timestamp;
			}).reverse();

			return latest[0];
		}
		return;
	},

	niceTime: function(time){
		return time;
	},

    render: function() {

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

        return (
        	/* jshint ignore:start */
            <div className="list-group">
                {items}
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = GroupConversations;

