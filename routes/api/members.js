const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//Gets all members data
router.get('/', (req, res) => {
    res.json(members);
});

//Get single member
router.get('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Member with the id of ${req.params.id} Not Found` });
    }
});


//Create Member
router.post('/', (req, res) => {
    //res.send(req.body);

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    } else {
        members.push(newMember);
        res.json(members);
        // res.redirect('/');
    }


});

//Update Member 
router.put('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: 'Member was updated', member });
            }
        });
    } else {
        res.status(400).json({ msg: `Member with the id of ${req.params.id} Not Found` });
    }
});



//Delete Member
router.delete('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {

        res.json({ msg: 'Member Deleleted', members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `Member with the id of ${req.params.id} Not Found` });
    }
});

//export module
module.exports = router;