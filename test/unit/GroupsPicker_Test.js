var chai = require('chai');
var expect = chai.expect;
var React = require('react');

var GroupsPicker = require('../../build/components/GroupsPicker');

var groups = require('../../demo/data').groups;

var selectedGroupId;

var handleGroupPicked = function(content){
    selectedGroupId = content.groupId;
    console.log('added: ',selectedGroupId)
};

describe('GroupsPicker', function() {
    var component, container;

    beforeEach(function() {
        //we add our component to test into a div and then render it
        component = GroupsPicker({groups:groups, onGroupPicked:handleGroupPicked});
        container = document.createElement('div');
        document.documentElement.appendChild(container);
        React.renderComponent(component, container);
    });

    afterEach(function() {
        React.unmountComponentAtNode(container);
        document.documentElement.removeChild(container);
    });

    it('should have a groups drop down', function() {
        var groupsDropDown = component.refs.groupsDropDown;
        expect(groupsDropDown).to.exist;
    });

    it('should return the selected id when handler ', function() {

        var theId = '99999999666667777hgf';
        component.refs.groupsDropDown.getDOMNode().value = theId;
        component.handleSelection();

        expect(selectedGroupId).to.equal(theId);
    });

    it('should fire the handler with the id of the choosen group', function() {

        component.refs.groupsDropDown.props.onChange();
        expect(selectedGroupId).to.exist;
    });

});