<?php
$news = json_decode(file_get_contents('news.json'), true) ?? [];
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Новости</title>
</head>
<body>
  <h1>Новости</h1>
  <?php foreach (array_reverse($news) as $item): ?>
    <div style="margin-bottom: 20px;">
      <h2><?= $item['title'] ?></h2>
      <small><?= $item['date'] ?></small>
      <p><?= nl2br($item['content']) ?></p>
    </div>
  <?php endforeach; ?>
</body>
</html>
