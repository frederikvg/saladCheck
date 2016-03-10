var mongoose = require('mongoose');

var saladcheckSchema =  new mongoose.Schema ({
  blabla: { type: String, default: ''},
  yyy: { type: String, default: ''}
});

module.exports = mongoose.model('saladchecks', saladcheckSchema);

