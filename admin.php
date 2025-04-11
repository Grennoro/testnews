<?php
session_start();
if (!isset($_SESSION['logged_in'])) {
    header("Location: login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Админка</title>
</head>
<body>
  <h2>Добавить новость</h2>
  <form action="save_news.php" method="POST">
    <input type="text" name="title" placeholder="Заголовок" required><br>
    <textarea name="content" placeholder="Текст новости" required></textarea><br>
    <button type="submit">Сохранить</button>
  </form>

  <p><a href="logout.php">Выйти</a></p>
</body>
</html>
