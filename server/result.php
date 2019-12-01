<?php

require_once("./config.php");

$db = mysqli_connect($config['dbHost'], $config['dbUser'], $config['dbPass'], $config['dbName']);
if (mysqli_connect_errno()) {
  echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
  echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
  echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
  exit();
}

mysqli_set_charset($db, "utf8");

// регистрационная информация (пароль #2)
// registration info (password #2)
$mrh_pass2 = "WeL0veTests2";

//установка текущего времени
//current date
$tm=getdate(time()+9*3600);
$date="$tm[year]-$tm[mon]-$tm[mday] $tm[hours]:$tm[minutes]:$tm[seconds]";

// чтение параметров
// read parameters
$out_summ = mysqli_real_escape_string($db, $_POST["OutSum"]);
$inv_id = mysqli_real_escape_string($db, $_POST["InvId"]);
$shp_item = mysqli_real_escape_string($db, $_POST["Shp_item"]);
$crc = mysqli_real_escape_string($db, $_POST["SignatureValue"]);

$crc = strtoupper($crc);

$my_crc = strtoupper(md5("$out_summ:$inv_id:$mrh_pass2:Shp_item=$shp_item"));

// проверка корректности подписи
// check signature
if ($my_crc !=$crc)
{
  echo "bad sign\n";
  exit();
}

// признак успешно проведенной операции
// success
echo "OK$inv_id\n";

// запись в бд информации о проведенной операции
// save order info to db
$paied = 'оплачено';
$order_query = "UPDATE `orders` SET status='$paied' WHERE id='$inv_id' LIMIT 1;";
$id_query = "SELECT * FROM `orders` WHERE id='$inv_id' LIMIT 1;";

$id_res = mysqli_query($db, $id_query);
$id_raw = mysqli_fetch_assoc($id_res);
mysqli_free_result($id_res);

$user = $id_raw['user'];
$uid = $id_raw['uid'];

$new_item = "INSERT INTO `storage` (name, owner, uid) VALUES ('$shp_item', '$user', '$uid');";

mysqli_query($db, $order_query);
mysqli_query($db, $new_item);

?>
