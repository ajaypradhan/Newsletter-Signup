const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    lLNAME: lastName,
                },
            },
        ],
    };
    const jsonData = JSON.stringify(data);
    const url = 'https://us17.api.mailchimp.com/3.0/lists/c229af4530';
    const options = {
        method: 'POST',
        auth: 'ajay:2109aa00372dd5c5d4b456a6f9f2d289-us17',
    };
    const request = https.request(url, options, function (response) {
        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});

// API KEY
// 2109aa00372dd5c5d4b456a6f9f2d289-us17
// audience id
// c229af4530
