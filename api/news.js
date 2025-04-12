import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, content, image } = req.body;

      const newsData = {
        title,
        content,
        image,
        date: new Date().toLocaleString(),
      };

      // Используем path.join() для корректного указания пути
      const newsFilePath = path.join(process.cwd(), 'news.json'); // Путь к файлу, предполагается, что news.json в корне проекта

      // Чтение текущих новостей
      let newsArray = [];
      if (fs.existsSync(newsFilePath)) {
        const fileData = fs.readFileSync(newsFilePath, 'utf-8');
        newsArray = JSON.parse(fileData);
      }

      // Добавляем новую новость
      newsArray.push(newsData);

      // Сохраняем обновленный список новостей
      fs.writeFileSync(newsFilePath, JSON.stringify(newsArray, null, 2));

      // Отправляем успешный ответ
      res.status(200).json({ message: 'Новость добавлена успешно!' });
    } catch (error) {
      console.error('Ошибка при добавлении новости:', error);
      res.status(500).json({ error: 'Произошла ошибка на сервере.' });
    }
  } else {
    res.status(405).json({ error: 'Метод не разрешен.' });
  }
}

