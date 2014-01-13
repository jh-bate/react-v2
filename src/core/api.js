var bows = require('bows');

var config = {
  DEMO : true
};

var api = {
  log: bows('Api'),

  init: function() {
    if (config.DEMO) {
      addDemoOverrides(this);
    }
  },

  user: {},
  groups: {},
  notes: {}
};

// ---------- BEGIN DEMO OVERRIDES ----------
function addDemoOverrides(api) {
  var demoUsers = require('../../demo/data').users;

  // ----- User -----

  api.user.get = function(callback) {
    var uri = '/user.json';
    api.log('[demo] GET ' + uri);
    callback(null, data);
  };

  return api;
}
// ---------- END DEMO OVERRIDES ----------

module.exports = api;