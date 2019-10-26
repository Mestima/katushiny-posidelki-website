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

  if (isset($_POST['username'])) {
    $name = mysqli_real_escape_string($db, $_POST['username']);
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
    $password_2 = mysqli_real_escape_string($db, $_POST['password_2']);

    //добавить проверку капчи

    if (empty($name)) { echo "Необходимо ввести имя пользователя!"; exit(); }
    if (empty($email)) { echo "Необходимо ввести email!"; exit(); }
    if (empty($password_1)) { echo "Необходимо ввести пароль!"; exit(); }
    if ($password_1 != $password_2) {
  	   echo "Введенные пароли не совпадают.";
       exit();
    }

    $user_check_query = "SELECT * FROM users WHERE name='$name' OR email='$email' LIMIT 1";
    $result = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result);
    $result->close();

    if ($user) {
      if ($user['name'] === $name) {
        echo "Пользователь с таким именем уже существует.";
        exit();
      }

      if ($user['email'] === $email) {
        echo "Ваш email уже зарегистрирован.";
        exit();
      }
    }

    $password = md5(md5(md5($password_1)));
    $token = array(
      'name' => $name,
      'pass' => $password
    );
    $token = hash('sha256', json_encode($token));
    $query = "INSERT INTO users (name, email, password, token)
    		  VALUES('$name', '$email', '$password', '$token')";
    mysqli_query($db, $query);
    echo "Регистрация прошла успешно!";
    exit();
  }
  echo 'Ошибка! Неверный запрос.';
  $db->close();
?>
