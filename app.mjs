import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://nasir:Nasir@123@cluster0.s5cdy.mongodb.net/Registration?retryWrites=true&w=majority');
const User = mongoose.model('User', {
    name: String,
    email: String,
    address: String
});


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// GET Request
app.get('/users', (req, res) => {

    User.find({}, (err, users) => {
        if (!err) {
            res.send(users)
        } else {
            res.status(500).send("error happened")
        }
    })


})
app.get('/user/:id', (req, res) => {

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (!err) {
            res.send(user)
        } else {
            res.status(500).send("error happened")
        }
    })

})

// POST Request
app.post('/user', (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.address) {
        res.status(400).send("invalid data");
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        });
        newUser.save().then(() => {
            console.log('user created success')
            res.send("users created");
        });
    }
})
// PUT Request
app.put('/user/:id', (req, res) => {
    let updateObj = {}

    if (req.body.name) {
        updateObj.name = req.body.name
    }
    if (req.body.email) {
        updateObj.email = req.body.email
    }
    if (req.body.address) {
        updateObj.address = req.body.address
    }

    User.findByIdAndUpdate(req.params.id, updateObj, { new: true },
        (err, data) => {
            if (!err) {
                res.send(data)
            } else {
                res.status(500).send("error happened")
            }
        })
})
// DELETE Request
app.delete('/user/:id', (req, res) => {

    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.send("user deleted")
        } else {
            res.status(500).send("error happened")
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
