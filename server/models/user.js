/**
 * Created by Anghabo on 7/1/2017.
 */

var mongoose = require('mongoose');

var User = mongoose.model('Users', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 1
    }
});

module.exports = {
    User
};
