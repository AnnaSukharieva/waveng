<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$phone = $_POST['phone'];
$social = $_POST['social'];
$token = "6184274522:AAHFWPhhkwBoSvCAp3yG8K80rcs11Wbx0j8";
$chat_id = "-928217072";
$arr = array(
  'Ім`я: ' => $name,
  'Телефон: ' => $phone,
  'Телеграм/інстаграм: ' => $social,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  return true;
} else {
   return false;
}

?>