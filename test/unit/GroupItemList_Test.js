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

    console.log('data',groups[0]);

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

    it('should have method to get a summary of the content of the most recent message', function() {
        expect(component.summaryForMessage).to.exist;
    });

    it('should have method to get a nice time for display from the timestamp', function() {
        expect(component.niceTime).to.exist;
    });

});