<?php

require_once("./config.php");

if (!isset($_GET['item'])) { exit(); }

$db = mysqli_connect($config['dbHost'], $config['dbUser'], $config['dbPass'], $config['dbName']);
if (mysqli_connect_errno()) {
  echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
  echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
  echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
  exit();
}

mysqli_set_charset($db, "utf8");

$response = $_GET["g-recaptcha-response"];
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
  'secret' => '6LeUfcUUAAAAANRi2Hflsh_mfVfCcJ4btGU3ctSW',
  'response' => $_GET["g-recaptcha-response"]
];
$options = [
  'http' => [
    'method' => 'POST',
    'content' => http_build_query($data)
  ]
];
$context  = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success=json_decode($verify);
if ($captcha_success->success == false) {
  echo "Ты робот! Портал тебя не пропустит!";
} else if ($captcha_success->success == true) {
  $token = mysqli_real_escape_string($db, $_GET['token']);
  if (!isset($_GET['token']) || $token == 'none') {
    echo "Вам необходимо зарегистрироваться!\n";
    $db->close();
    exit();
  }
  $shp_item = mysqli_real_escape_string($db, $_GET['item']);

  $id_query = "SELECT * FROM `orders` ORDER BY id DESC LIMIT 1;";
  $desc_query = "SELECT * FROM `tickets` WHERE name='$shp_item' LIMIT 1;";
  $user_query = "SELECT * FROM `users` WHERE token='$token' LIMIT 1;";


  $id_res = mysqli_query($db, $id_query);
  $id_raw = mysqli_fetch_assoc($id_res);
  mysqli_free_result($id_res);
  $id_int = intval($id_raw['id']);

  $desc_res = mysqli_query($db, $desc_query);
  $desc_raw = mysqli_fetch_assoc($desc_res);
  mysqli_free_result($desc_res);

  $user_res = mysqli_query($db, $user_query);
  $user_raw = mysqli_fetch_assoc($user_res);
  mysqli_free_result($user_res);

  $user = $user_raw['name'];

  if ($shp_item != $desc_raw['name']) { $db->close(); exit(); }
  $desc_str = $desc_raw['description'];

  $cost = $desc_raw['cost'];

  $mrh_login = "katusha_events";
  $mrh_pass1 = "WeL0veTests1";
  $inv_id = $id_int + 1;
  $uid = md5($inv_id + $shp_item);
  $inv_desc = $desc_str;
  $out_summ = $cost;
  $in_curr = "";
  $culture = "ru";
  $encoding = "utf-8";
  $crc = md5("$mrh_login:$out_summ:$inv_id:$mrh_pass1:Shp_item=$shp_item");

  $new_order = "INSERT INTO `orders` (user, name, description, cost, uid) VALUES ('$user', '$shp_item', '$desc_str', '$cost', '$uid');";
  mysqli_query($db, $new_order);
  print "<a href='https://auth.robokassa.ru/Merchant/Index.aspx?".
        "MerchantLogin=$mrh_login&OutSum=$out_summ&InvId=$inv_id&IncCurrLabel=$in_curr".
        "&Description=$inv_desc&SignatureValue=$crc&Shp_item=$shp_item".
        "&Culture=$culture&Encoding=$encoding'><h1>Продолжить</h1></a>";
}

$db->close();
?>
