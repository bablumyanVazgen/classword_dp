const express = require('express');
const app = express();
const { db } = require('./database/connection');
const user = require('./user/route');
const members = require('./members/route')
const {
    HOST,
    PORT,
} = process.env;

app.use(express.json());

app.use('/user', user.route)
app.use('/members', members.route)

db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);

    db.query('SELECT * FROM `members`', function (error, results, fields) {
        if (error) throw error;

        console.table(results)
    })
});


app.listen(PORT, () => {
    console.log(`started: ${HOST}:${PORT}`)
})