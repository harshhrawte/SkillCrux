process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`LMS API listening on port ${PORT}`);
});

