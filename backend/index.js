

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('passport'); // Import passport
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Passport Config (must be after models are registered)
require('./config/passport')(passport); // Pass passport to config

// Middleware
app.use(cors());
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());


// --- Use the API Routes ---



const typeOfWorkRouter = require('./routes/typeOfWork');
app.use('/api/work-types', typeOfWorkRouter);

const contractorsRouter = require('./routes/contractors');
app.use('/api/contractors', contractorsRouter);

const projectsRouter = require('./routes/projects');
app.use('/api/projects', projectsRouter);

const statusesRouter = require('./routes/statuses');
app.use('/api/statuses', statusesRouter);

const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);

const eventsRouter = require('./routes/events');
app.use('/api/events', eventsRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

const contractorDashboardRouter = require('./routes/contractorDashboard');
app.use('/api/contractor-dashboard', contractorDashboardRouter);

const dashboardRouter = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRouter);

const userActionsRouter = require('./routes/userActions');
app.use('/api/user', userActionsRouter);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
