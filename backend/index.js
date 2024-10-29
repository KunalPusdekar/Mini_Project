const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const leetcodeRoutes = require('./routes/leetcode');
const codechefRoutes = require('./routes/codechef');
const gfgRoutes = require('./routes/gfg');
const codeforcesRouter = require('./routes/codeforces');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('server started');
});

app.use('/leetcode', leetcodeRoutes);
app.use('/codechef', codechefRoutes);
app.use('/gfg', gfgRoutes);
app.use('/codeforces', codeforcesRouter);

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
