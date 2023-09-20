const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('frontend/build'));

app.get('/health', (req, res) => {
  res.send('ok');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
