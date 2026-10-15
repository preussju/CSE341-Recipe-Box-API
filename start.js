
require('dotenv').config();

const app = require('./server');
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if (err) {
        console.error('Database is not listening:', err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port ${port}`);
        });
    }
});
