const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://localhost:27017/contacts',{useNewUrlParser:true});

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  contactid:Number,
  name: String,
  email:String,
  phone: String,
  address: String,
  hasImage:Boolean,
  imageUrl:String,
});

ContactSchema.plugin(autoIncrement.plugin, { model: 'Contacts', field: 'contactid',startAt: 100,incrementBy: 100 });

var Contacts = connection.model('Contacts', ContactSchema);
module.exports = Contacts;