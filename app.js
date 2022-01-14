const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use('/', SOME_ROUTE); 

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
