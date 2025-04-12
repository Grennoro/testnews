import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const filePath = path.join(process.cwd(), 'users.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileData).users;

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }
  } else {
    res.status(405).json({ message: 'Метод не разрешён' });
  }
}
