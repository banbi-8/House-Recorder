<?php
    header("Content-Type: application/text; charset=UTF-8"); //ヘッダー情報の明記。必須。

    $fileName = $_GET['fileName'] . ".template";
    $url = "http://192.168.33.10/House-Recorder/src/templates/$fileName";
    $template = file_get_contents($url);
    print $template;
?>