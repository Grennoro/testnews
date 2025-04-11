<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  // Простой логин: admin / 1234
  if ($username === "admin" && $password === "1234") {
    $_SESSION["logged_in"] = true;
    header("Location: admin.html");  // Переадресация на страницу админа
    exit();
  } else {
    echo "<p style='color:red;'>Неверный логин или пароль</p>";
    echo '<a href="login.html">Назад</a>';
  }
}
?>
