import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Настроим Multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для хранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  }
});

const upload = multer({ storage: storage });

// Миддлвар для парсинга тела запроса
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы (для картинок)
app.use('/uploads', express.static('uploads'));

// Обработчик для добавления новости
app.post('/add-news', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Путь к изображению

  // Формируем объект новости
  const newsItem = {
    title,
    content,
    image: imagePath,
    date: new Date().toLocaleString()
  };

  // Читаем существующие новости из JSON файла
  fs.readFile('news.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Ошибка при чтении файла' });
    }

    const newsArray = data ? JSON.parse(data) : [];
    newsArray.push(newsItem); // Добавляем новую новость

    // Сохраняем новости обратно в JSON файл
    fs.writeFile('news.json', JSON.stringify(newsArray, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Ошибка при записи в файл' });
      }
      res.status(200).json({ success: true, message: 'Новость добавлена' });
    });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
