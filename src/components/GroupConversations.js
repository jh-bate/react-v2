/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var ConversationOverview = require('./ConversationOverview');

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

    conversationsForGroup:function(group){

        var latestForConversation = [];


        console.log('in: ',group.messages);

        var convsersations = _.groupBy(group.messages, 'rootmessageid');

        _.each(convsersations, function(conversationMessages){

            console.log('conversations: ',conversationMessages);

            //these aren't the root messages
            if(conversationMessages[0].rootmessageid){

                var latest =  _.sortBy(conversationMessages, function (message) {
                    return message.timestamp;
                }).reverse();

                console.log('latest: ',latest[0]);

                latestForConversation.push(latest[0]); 
            }
        });



        var items = latestForConversation.map(function(message, i) {

            return (
                /* jshint ignore:start */
                <ConversationOverview
                    onClick={this.props.onGroupSelected.bind(this.props, i)}
                    key={message.rootmessageid} 
                    name={group.name}
                    latestNoteSummary={this.summaryForMessage(message.messagetext)}
                    when={this.niceTime(message.timestamp)}/>
                /* jshint ignore:end */    
            );
        }.bind(this));

        console.log('out: ',items);

        return items;
    },

    render: function() {

        var items = this.conversationsForGroup(this.props.groups[0]); 

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

