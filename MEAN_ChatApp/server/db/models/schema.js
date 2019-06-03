const connection = require("./connection");
const Schema = connection.Schema;
const userSchema = new Schema({
         'creator':{type:String, require:true},
         'joiner':{type:String},
         'messanger':{type:String}
});
const UserModel = connection.model('USER',userSchema);
module.exports=UserModel;