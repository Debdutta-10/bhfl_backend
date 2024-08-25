const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const user = {
    full_name: 'debdutta_mukherjee',
    dob: '10102003',
    email: 'debdutta.mukherjee2021@vitstudent.ac.in',
    roll_number: '21BCE1897'
};

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input. "data" must be an array.'
        });
    }

    const numbers = [];
    const alphabets = [];
    let highest_lowercase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highest_lowercase || item > highest_lowercase)) {
                highest_lowercase = item;
            }
        }
    });

    res.status(200).json({
        is_success: true,
        user_id: `${user.full_name}_${user.dob}`,
        email: user.email,
        roll_number: user.roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : []
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
