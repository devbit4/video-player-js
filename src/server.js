import express from 'express';

const app = express();

const PORT = 4000;

const handleListening = () => console.log('server is listening');

app.listen(PORT, handleListening);

// const handleHome = (req, res) => {
//   return res.send('<p>Home</p>');
// };

// const handleLogin = (req, res) => {
//   return res.send('<p>Login</p>');
// };

// const handleAbout = (req, res) => {
//   return res.send('<p>About</p>');
// };

// const handleContact = (req, res) => {
//   return res.send('<p>Contact</p>');
// };

// app.get('/', handleHome);
// app.get('/login', handleLogin);
// app.get('/about', handleAbout);
// app.get('/contact', handleContact);

const urlLogger = (req, res, next) => {
  console.log(`Path:${req.url}`);
  next();
};
const timeLogger = (req, res, next) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  console.log(`Time:${year}.${month}.${day}`);
  next();
};
const securityLogger = (req, res, next) => {
  if (req.protocol === 'https') {
    console.log('Secure');
  } else {
    console.log('Insecure');
  }
  next();
};
const protectoreLogget = (req, res, next) => {
  if (req.url === '/protected') {
    return res.send('<h1>Not Allowed</h1>');
  }
  next();
};

app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectoreLogget);
