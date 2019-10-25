<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, PUT");
  header("Access-Control-Allow-Headers: Content-Type");

  $db = mysqli_connect("127.0.0.1", "login", "password", "database");
  if (mysqli_connect_errno()) {
    echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
    echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
    exit();
  }

  if (isset($_POST['username'])) {
    $name = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    //добавить проверку капчи

    if (empty($name)) { echo "Необходимо ввести имя пользователя!"; exit(); }
    if (empty($password)) { echo "Необходимо ввести пароль!"; exit(); }

    $user_check_query = "SELECT * FROM users WHERE name='$name' LIMIT 1";
    $result = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result);
    $result->close();

    if ($user) {
      if ($user['password'] === md5(md5($password))) {
        $answer = array(
          'username' => $user['name'],
          'email' => $user['email'],
          'usergroup' => $user['usergroup']
        );
        echo json_encode($answer);
        exit();
      } else {
        echo "Комбинация логина и пароля не найдена!";
        exit();
      }
    }
  }
  echo 'Ошибка! Неверный запрос.';
  $db->close();
?>
