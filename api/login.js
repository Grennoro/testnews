import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const filePath = path.join(process.cwd(), 'users.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileData).users;

    const user = users.find(user => user.username === username);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Неверный логин' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Неверный пароль' });
    }
  } else {
    res.status(405).json({ message: 'Метод не разрешён' });
  }
}
