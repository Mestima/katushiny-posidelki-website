<?php

// регистрационная информация (пароль #1)
// registration info (password #1)
$mrh_pass1 = "WeL0veTests1";

// чтение параметров
// read parameters
$out_summ = $_GET["OutSum"];
$inv_id = $_GET["InvId"];
$shp_item = $_GET["Shp_item"];
$crc = $_GET["SignatureValue"];

$crc = strtoupper($crc);

$my_crc = strtoupper(md5("$out_summ:$inv_id:$mrh_pass1:Shp_item=$shp_item"));

// проверка корректности подписи
// check signature
if ($my_crc != $crc)
{
  echo "bad sign\n";
  exit();
}

// проверка наличия номера счета в истории операций
// check of number of the order info in history of operations
echo "
<html>
  <head>
    <meta charset="utf-8">
    <title>Катюшины Посиделки</title>
  </head>
  <body>
    <div align="center">
      <div>
        Вы отказались от оплаты. Заказ#$inv_id <br>
        <a href='http://katusha-events.ru/'><h3>Вернуться на сайт :3</h3></a>
    </div>
  </body>
</html>
";
?>
