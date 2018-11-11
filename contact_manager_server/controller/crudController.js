var Contacts = require('../models/dbModel');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Contacts = require('../models/dbModel');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(urlencodedParser);

    app.post('/contacts/new',function(req,res){
        if(req.body.id) {
            Contacts.update({"_id":req.body.id},req.body,function(err,contacts){
                res.send('Updated');
            })
        } else {
            Contacts.insertMany(req.body,function(err,contacts){
                res.send('Inserted');
            });
        }     
    });

    app.get('/contacts',function(req,res){
        Contacts.find({},function(err,contacts){
            res.send(contacts);
        });
    });

    app.get('/contacts/:id',function(req,res){
        Contacts.findOne({"_id":req.params.id},function(err,contacts){
            res.send(contacts);
        });
    });

    app.delete('/contacts/delete',function(req,res){
        Contacts.findByIdAndRemove(req.body.id,function(err,contacts){
            res.send('Deleted');
        });
    });

}