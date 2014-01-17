/** @jsx React.DOM */

var React = require('react');

//Form for adding Comments
var GroupsPicker = React.createClass({

    handleSelection: function() {
        selectedId = this.refs.groupsDropDown.getDOMNode().value.trim();
        this.props.onGroupPicked({groupId:selectedId});
    },

    render: function() {

        var groups = this.props.groups.map(function(group) {    
            return (
                /* jshint ignore:start */
                <option value={group.id}>{group.name}</option>
                /* jshint ignore:end */    
            );
        });

        return this.transferPropsTo(
            /* jshint ignore:start */
            <div>
                <form>
                    <div className="form-group">
                        <select className='form-control' ref='groupsDropDown' onChange={this.handleSelection}>
                            {groups}
                        </select>
                    </div>
                </form>
            </div>
            /* jshint ignore:end */ 
        );
    }
});

module.exports = GroupsPicker;
