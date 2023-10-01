// Create a Schema for mongoose
const mongoose = require('mongoose');

// Create our own instance of a Schema and define it's features
const MessageRoomSchema = new mongoose.Schema({
  // We use a schema to define documents stored in a collection
  // This is where we define each column in the document
  //* columnName: DataType
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    // we can use {} to add "options" to our column
    type: String, // what data type do I use for this column
    required: false // default for required is false
  },
  messages: {
    required: true,
    type: [],
  },
  ownerId: {
    type: String,
    required: true
  }
});

// A Schema is a "blueprint" used within the database to scaffold or plan our documents. Our "documents" being the items we are storing within a collection
// We need to export a model based on our schema
module.exports = mongoose.model('Message Room', MessageRoomSchema);
// mongoose.model is a method that will create a model using a schema as reference
