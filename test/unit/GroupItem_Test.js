var chai = require('chai');
var expect = chai.expect;
var React = require('react');

var GroupItem = require('../../build/components/GroupItem');

var testGroupName = 'My Test Group';

describe('GroupItem', function() {
    var component, container;

    beforeEach(function() {
        //we add our component to test into a div and then render it
        component = GroupItem({
            name : testGroupName
        });

        container = document.createElement('div');
        document.documentElement.appendChild(container);
        React.renderComponent(component, container);

    });

    afterEach(function() {
        React.unmountComponentAtNode(container);
        document.documentElement.removeChild(container);
    });

    it('should have property for the group name', function() {
        expect(component.props.name).to.equal(testGroupName);
    });

});