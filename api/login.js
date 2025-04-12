export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }
  } else {
    res.status(405).json({ message: 'Метод не разрешён' });
  }
}
