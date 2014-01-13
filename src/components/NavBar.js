/** @jsx React.DOM */

var React = require('react');

var NavBar = React.createClass({

    getInitialState: function() {
        return {detail: false};
    },
  
    getStandardNav : function(){
        return this.transferPropsTo(
            <div className="navbar navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                        <ul className="nav">
                            <li className={this.props.active === 'thread' && 'active'}><a href="#/thread">Notes</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    },

    getDetailNav : function(){
        return this.transferPropsTo(
            <div className="navbar navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                        <a className="brand" href="#/">Back</a>
                        <h2 className='title'>{this.props.detailName}</h2>
                    </div>
                </div>
            </div>
        );
    },

    render: function() {
        if(this.state.detail){
            return this.getDetailNav();
        }
        return this.getStandardNav();
    }
});

module.exports = NavBar;