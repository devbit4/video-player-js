import User from '../models/User';

export const login = (req, res) => res.send('login');

export const getJoin = (req, res, next) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = 'Join';
  console.log(name, username, email, password, password2, location);
  //확인비밀번호가 다를 때
  if (password !== password2) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'Password confirmation does not match.',
    });
  }
  //이미 존재하는 username 또는 email 일때
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'This username/email is already taken.',
    });
  }

  await User.create({
    name,
    username,
    email,
    password,
    location,
  });

  return res.redirect('/login');
};

export const logout = (req, res) => res.send('logout');
export const edit = (req, res) => res.send('edit user');
export const remove = (req, res) => res.send('remove user');
export const see = (req, res) => res.send('see user');
