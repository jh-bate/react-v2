var chai = require('chai');
var expect = chai.expect;
var React = require('react');

var GroupItemList = require('../../build/components/GroupItemList');


describe('GroupItemList', function() {
    var component, container;

    beforeEach(function() {
        //we add our component to test into a div and then render it
        component = GroupItemList();

        container = document.createElement('div');
        document.documentElement.appendChild(container);
        React.renderComponent(component, container);

    });

    afterEach(function() {
        React.unmountComponentAtNode(container);
        document.documentElement.removeChild(container);
    });

    it('should exist', function() {
        expect(component).to.exist;
    });

});