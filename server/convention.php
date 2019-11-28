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

  if (isset($_POST['convention'])) {
    $convention = $_POST['convention'];
    $query = "SELECT * FROM `tickets` WHERE convention='$convention'";
    $result = mysqli_query($db, $query);
    $rows = mysqli_num_rows($result);
    $answer = array();
    for ($i = 1; $i < $rows+1; $i++) {
      $row = mysqli_fetch_row($result);
      $answer[$i] = array(
        'name' => $row[1],
        'cost' => $row[2],
        'description' => $row[3],
        'link' => $row[6]
      );
    }
    mysqli_free_result($result);

    $query_title = "SELECT * FROM `conventions` WHERE name='$convention' LIMIT 1";
    $result = mysqli_query($db, $query_title);
    $rows = mysqli_num_rows($result);
    $row = mysqli_fetch_row($result);
    $answer[0] = array(
      'name' => $row[1],
      'starts' => $row[2],
      'ends' => $row[3],
      'description' => $row[4],
      'visitors' => $row[5]
    );
    mysqli_free_result($result);
    
    echo json_encode($answer);
    $db->close();
    exit();
  }
  echo "Ошибка! Не выбрано мероприятие!";
  $db->close();
?>
