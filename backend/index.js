// backend/server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// --- Use the API Routes ---
const typeOfWorkRouter = require('./routes/typeOfWork');
app.use('/api/work-types', typeOfWorkRouter); // Now your API is live at this URL

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


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});