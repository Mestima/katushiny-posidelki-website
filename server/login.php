<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, PUT");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Credentials: true");

  require_once("./config.php");

  $db = mysqli_connect($config['dbHost'], $config['dbUser'], $config['dbPass'], $config['dbName']);
  if (mysqli_connect_errno()) {
    echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
    echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
    exit();
  }

  mysqli_set_charset($db, "utf8");

  if (isset($_POST['token'])) {
    $token = mysqli_real_escape_string($db, $_POST['token']);
    $token_query = "SELECT * FROM users WHERE token='$token' LIMIT 1";
    $result = mysqli_query($db, $token_query);
    $user = mysqli_fetch_assoc($result);
    $result->close();

    if ($user) {
      $answer = array(
        'username' => $user['name'],
        'email' => $user['email'],
        'usergroup' => $user['usergroup'],
        'token' => $token
      );
      echo json_encode($answer);
    } else {
      echo 'Неверный токен.';
    }
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
      if ($user['pass'] === md5(md5($password))) {
        $answer = array(
          'username' => $user['name'],
          'email' => $user['email'],
          'usergroup' => $user['usergroup'],
          'token' => $user['token']
        );
        echo json_encode($answer);
        exit();
      }
    }
  }
  echo "Комбинация логина и пароля не найдена!";
  $db->close();
?>
