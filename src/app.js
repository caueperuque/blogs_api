const express = require('express');
const { loginRoute, userRoute, categoryRoute, postRoute } = require('./routes');
// const auth = require('./middlewares/auth');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// app.use(auth);
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute); 
// Testando avalidor do GitHub v2
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
