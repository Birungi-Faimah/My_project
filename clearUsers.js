const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/karibu_pug')
  .then(() => mongoose.connection.db.dropCollection('signups'))
  .then(() => { console.log('Users cleared'); process.exit(0); })
  .catch(err => { console.error(err); process.exit(1); });
