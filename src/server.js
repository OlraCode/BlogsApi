require('dotenv').config();
const connectDB = require('./database');
const app = require('./app');

connectDB();

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});