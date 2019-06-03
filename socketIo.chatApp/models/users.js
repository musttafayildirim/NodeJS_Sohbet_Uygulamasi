const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//veri tabanına eklediğimiz kayıtalar ilk defa geliyorsa kaydı gerçekleştiriyor dönen veri tekrar gelmişse onu buluyor...
const findOrCreate = require('mongoose-find-or-create');

const userSchema = new Schema({
    googleId:{
        type:String,
        unique : true
    },
    name: String,
    surname : String,
    profilePhotoUrl : String

});
//bu metodu plugin etmemiz gerekiyor.
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('users', userSchema);