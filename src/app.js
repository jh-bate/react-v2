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

var Layout = require('./layout/Layout');

var NavBar = require('./components/NavBar');
var ListNavBar = require('./components/ListNavBar');

var Login = require('./components/Login');
var GroupItemList = require('./components/GroupItemList');
var MessageItemList = require('./components/MessageItemList');

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

        //console.log('setup ...');
        if (this.state.authenticated) {
            //console.log('authenticated ...');
            this.fetchUserData();
            this.setState({routeName:'groups'});
        }
        //router
        var router = Router({
            '/': this.setState.bind(this, {routeName: 'login'}),
            '/groups': this.setState.bind(this, {routeName: 'groups'}),
            '/thread': this.setState.bind(this, {routeName: 'thread'})
        });
        router.init();
    },

    render: function () {
        
        var content = this.renderContent();

        return (
            <div className="app">
                {content}
            </div>
        );
    },

    handleLogout:function(){
        //console.log('logging out ...');
        var self = this;
        app.auth.logout(function(){
            self.setState({authenticated: false,groups:null,messages:null, user:null,loggingOut:true,routeName:'login'});
        });
    },

    handleBack:function(){
        //console.log('going back ...');
        this.setState({routeName:'groups'});
    },

    handleLoginSuccess:function(){
        //console.log('successful login');
        this.setState({authenticated: true});
        this.fetchUserData();
        this.setState({routeName:'groups'});
    },

    handleShowThread:function(groupId){
        //console.log('selected: ',groupId);
        //console.log('messages for selected: ',this.state.groups[groupId].messages);        
        this.setState({messages: this.state.groups[groupId].messages,routeName:'thread'});
    },

    renderContent:function(){
        var routeName = this.state.routeName;

        if (this.state.authenticated && routeName === 'groups') {
            /* jshint ignore:start */
            return (
                <Layout>
                    //<NavBar onLogoutSuccess={this.handleLogoutSuccess} logout={app.auth.logout.bind(app.auth)}/>
                    <ListNavBar title='Teams' actionName='Signout' onActionHandled={this.handleLogout}/>
                    <GroupItemList groups={this.state.groups} onGroupSelected={this.handleShowThread} />
                </Layout>
            );
            /* jshint ignore:end */
        }else if(this.state.authenticated && routeName === 'thread'){
            /* jshint ignore:start */
            return (
                <Layout>
                    <ListNavBar title='All Notes' actionName='Back' onActionHandled={this.handleBack}/>
                    <MessageItemList messages={this.state.messages} />
                </Layout>
            );
            /* jshint ignore:end */
        }else{
            /* jshint ignore:start */
            return (  
                <Layout>
                    <Login onLoginSuccess={this.handleLoginSuccess} login={app.auth.login.bind(app.auth)}/>
                </Layout>
            );
            /* jshint ignore:end */
        }
    },

    fetchUserData: function() {
        var self = this;
        //console.log('getting user');
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
        //console.log('authenticating ...');
        self.auth.init(callback);
        callback();
    }

    initApi();
};

module.exports = app;