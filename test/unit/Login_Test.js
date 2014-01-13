var chai = require('chai');
var expect = chai.expect;
var React = require('react');

var Login = require('../../build/pages/Login');

var loggedIn = false;

var handleLoginSuccess  = function(){
    loggedIn = true;
};


describe('Login', function() {
    var component, container;

    beforeEach(function() {
        //we add our component to test into a div and then render it
        component = Login({
            onLogin : handleLoginSuccess
        });

        container = document.createElement('div');
        document.documentElement.appendChild(container);
        React.renderComponent(component, container);

    });

    afterEach(function() {
        React.unmountComponentAtNode(container);
        document.documentElement.removeChild(container);
    });

    it('should have a login button', function() {
        var loginBtn = component.refs.loginBtn;
        expect(loginBtn).to.exist;
    });

    it('should take a users email', function() {
        var email = component.refs.emailFeild;
        expect(email).to.exist;
    });

    it('should take a users password', function() {
        var pw = component.refs.pwFeild;
        expect(pw).to.exist;
    });

    it('should fire onLogin handler when submit clicked', function() {
        expect(loggedIn).to.be.false;
        component.props.onLogin();
        expect(loggedIn).to.be.true;
    });

});