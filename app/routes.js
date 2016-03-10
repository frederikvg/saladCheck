var saladcheck = require('./model/saladcheck');

module.exports = function (app) {

    app.get('/saladchecks', function (req, res) {
        saladcheck.find(function (err, monsters) {
            if (err) res.send(err);
            else res.json(monsters);
        });
    });

    app.post('/saladcheck', function (req, res) {
        var newMonster = new saladcheck({ 
            heroClass: req.body.heroclass, 
            monsterClass: req.body.monsterclass, 
            blabla: req.body.blabla, 
            yyy: req.body.yyy 
        });

        newMonster.save(function (err) {
            if (err)res.send(err);
            res.status(200).end();
        });
    });

    app.delete('/saladcheck/:id', function (req, res) {
        saladcheck.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err)
                res.send(err);
                res.status(200).end();
        });
    });

};