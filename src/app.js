/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var React = require('react');
var Router = require('director').Router;
var bows = require('bows');

var NavBar = require('./components/NavBar');
var Login = require('./pages/Login');
var Groups = require('./pages/Groups');
var Thread = require('./pages/Thread');

var auth = require('./core/auth');
var api = require('./core/api');
var user = require('./core/user');

var app = {
    log: bows('App'),
    user:user,
    api:api,
    auth:auth
};

require('./ClamShellApp.css');

var ClamShellApp = React.createClass({
    getInitialState: function () {
        return {
            messages: null,
            routeName: 'login',
            authenticated: app.auth.isAuthenticated(),
            user: null,
            groups: null,
            loggingOut: false
        };
    },

    componentDidMount: function () {

        console.log('setup ...');

        if (this.state.authenticated) {
            console.log('authenticated ...');
            this.fetchUserData();
            this.setState({routeName:'groups'});
        }
        this.setupAndStartRouter();
    },

    setupAndStartRouter:function(){
        var router = Router({
            '/': this.setState.bind(this, {routeName: 'login'}),
            '/groups': this.setState.bind(this, {routeName: 'groups'}),
            '/thread': this.setState.bind(this, {routeName: 'thread'})
        });
        router.init();
    },

    render: function () {
        var nav = this.renderNav();
        var content = this.renderContent();

        return (
            <div className="app">
                {nav}
                {content}
            </div>
        );
    },

    renderNav:function(){
        if (this.state.authenticated) {
            /* jshint ignore:start */
            return <NavBar onLogoutSuccess={this.handleLogoutSuccess} logout={app.auth.logout.bind(app.auth)}/>;
            /* jshint ignore:end */
        }
        return null;
    },

    handleLogoutSuccess:function(){
        console.log('successful logout');
        this.setState({authenticated: true,groups:null,user:null,loggingOut:true,routeName:'groups'});
    },

    handleLoginSuccess:function(){
        console.log('successful login');
        this.setState({authenticated: true});
        this.fetchUserData();
        this.setState({routeName:'groups'});
    },

    renderContent:function(){
        var routeName = this.state.routeName;

        if (this.state.authenticated && routeName === 'groups') {
            /* jshint ignore:start */
            return <Groups userGroups={this.state.groups}/>;
            /* jshint ignore:end */
        }else if(this.state.authenticated && routeName === 'thread'){
            /* jshint ignore:start */
            return <Thread messages={this.state.messages} />;
            /* jshint ignore:end */
        }else{
            /* jshint ignore:start */
            return  <Login onLoginSuccess={this.handleLoginSuccess} login={app.auth.login.bind(app.auth)}/>;
            /* jshint ignore:end */
        }
    },

    fetchUserData: function() {
        var self = this;
        console.log('getting user');
        app.api.user.get(function(err, user) {
            self.setState({user: user});

            app.api.groups.get(user,function(err, groups) {
                console.log('getting user groups and hacking messages');
                self.setState({groups: groups, messages:groups[0].messages});
            });

        });
    }

});

app.start = function() {
    var self = this;

    this.init(function() {

        //Make it touchable
        React.initializeTouchEvents(true);

        self.component = React.renderComponent(
            /* jshint ignore:start */
            <ClamShellApp />,
            /* jshint ignore:end */
            document.getElementById('app')
        );

        self.log('App started');
    });
};

app.init = function(callback) {
    var self = this;

    function initApi() {
        self.api.init();
        initAuth();
    }

    function initAuth() {
        console.log('authenticating ...');
        self.auth.init(callback);
        callback();
    }

    initApi();
};

module.exports = app;