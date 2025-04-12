import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Устанавливаем путь для хранения изображений
const upload = multer({ dest: 'public/uploads/' });

// Настроим endpoint для обработки загрузки новостей
export const config = {
  api: {
    bodyParser: false,  // Отключаем стандартный парсер для работы с FormData
  },
};

const uploadMiddleware = upload.single('image');  // Ожидаем, что картинка будет в поле 'image'

export default function handler(req, res) {
  if (req.method === 'POST') {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка загрузки изображения' });
      }

      // Парсим данные из FormData
      const { title, content } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const newsFilePath = path.join(process.cwd(), 'news.json');
      
      // Чтение существующих новостей
      let newsData = [];
      if (fs.existsSync(newsFilePath)) {
        const fileContent = fs.readFileSync(newsFilePath);
        newsData = JSON.parse(fileContent);
      }

      const newNews = { title, content, image: imagePath, date: new Date().toLocaleString() };
      newsData.push(newNews);

      // Сохраняем обновленные новости в файл
      fs.writeFileSync(newsFilePath, JSON.stringify(newsData, null, 2));

      res.status(200).json({ success: true, message: 'Новость добавлена!' });
    });
  } else if (req.method === 'GET') {
    // Отправляем новости
    const newsFilePath = path.join(process.cwd(), 'news.json');
    if (fs.existsSync(newsFilePath)) {
      const fileContent = fs.readFileSync(newsFilePath);
      const newsData = JSON.parse(fileContent);
      res.status(200).json(newsData);
    } else {
      res.status(404).json({ message: 'Новости не найдены' });
    }
  } else {
    // Если метод не поддерживается
    res.status(405).json({ message: 'Метод не разрешён' });
  }
}
