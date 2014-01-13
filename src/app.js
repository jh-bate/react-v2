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
        var messages = [];
        return {
            messages: messages,
            routeName: 'login',
            authenticated: true
        };
    },

    componentDidMount: function () {
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
            return <NavBar className='Layout-topBar'/>;
            /* jshint ignore:end */
        }
        return null;
    },
    renderContent:function(){
        var routeName = this.state.routeName;

        if (this.state.authenticated && routeName === 'groups') {
            /* jshint ignore:start */
            return <Groups />;
            /* jshint ignore:end */
        }else if(this.state.authenticated && routeName === 'thread'){
            /* jshint ignore:start */
            return <Thread messages={this.props.messages} />;
            /* jshint ignore:end */
        }else{
            /* jshint ignore:start */
            return  <Login />;
            /* jshint ignore:end */
        }
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
        //self.api.init();
        initAuth();
    }

    function initAuth() {
        //self.auth.init(callback);
        callback();
    }

    initApi();
};

module.exports = app;