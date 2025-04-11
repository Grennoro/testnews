<?php
session_start();
if (!$_SESSION["logged_in"]) {
  header("Location: login.html");
  exit();
}

$title = $_POST["title"];
$content = $_POST["content"];
$date = date("Y-m-d H:i");

$new = [
  "title" => $title,
  "content" => $content,
  "date" => $date
];

$filename = "news.json";
$news = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];
$news[] = $new;
file_put_contents($filename, json_encode($news, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

header("Location: admin.html");
exit();
