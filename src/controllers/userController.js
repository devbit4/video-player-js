import User from '../models/User';

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

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

/**
 * 로그인 영역
 */
export const getLogin = (req, res) =>
  res.render('login', { pageTitle: 'Login' });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.exists({ username });
  if (!exists) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'An account with this username does not exists.',
    });
  }
  // check if password correct
  res.end();
};

export const logout = (req, res) => res.send('logout');
export const edit = (req, res) => res.send('edit user');
export const remove = (req, res) => res.send('remove user');
export const see = (req, res) => res.send('see user');
