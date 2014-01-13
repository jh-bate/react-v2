var chai = require('chai');
var expect = chai.expect;
var React = require('react');

var GroupItemList = require('../../build/components/GroupItemList');
var groups = require('../../demo/data').groups;

var handleGroupSelected = function(props, key){
    console.log('props: ',props);
    console.log('key: ',key);
    return true;
};

describe('GroupItemList', function() {
    var component, container;

    beforeEach(function() {
        //we add our component to test into a div and then render it
        component = GroupItemList({groups:groups,onGroupSelected:handleGroupSelected});

        container = document.createElement('div');
        document.documentElement.appendChild(container);
        React.renderComponent(component, container);

    });

    afterEach(function() {
        React.unmountComponentAtNode(container);
        document.documentElement.removeChild(container);
    });

    it('should have method to get most recent message based on timestamp', function() {
        expect(component.mostRecentMessage).to.exist;
    });

    it('should give me the newest message in the list of passed messages', function() {
        var mostRecent = component.mostRecentMessage(groups[0].messages);
        console.log(mostRecent.timestamp);
        expect(mostRecent.id).to.equal('070159bf-bd33-4998-b874-6b9c2bafe7fb');
    });

    it('should have method to get a summary of the content of the most recent message', function() {
        expect(component.summaryForMessage).to.exist;
    });

    it('should give the first ten words for summaryForMessage', function() {
        var summary = component.summaryForMessage('this is more than 10 words to see that it will give me a summary only');
        expect(summary).to.equal('this is more than 10 words to see that it ...');
    });

    it('should give the full message if it is under 10 words summaryForMessage', function() {
        var shortTestMessage = 'to the point';
        var summary = component.summaryForMessage(shortTestMessage);
        expect(summary).to.equal(shortTestMessage);
    });

    it('should have method to get a nice time for display from the timestamp', function() {
        expect(component.niceTime).to.exist;
    });

});