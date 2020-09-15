<?php

    error_reporting(0);

    $city = $_GET[city]; // 宣告變數 $city(和 js用 city做傳送數值的橋樑)
    //
    // $city = str_replace(" ", "-", $city); // string replace 替換參數("換","換成","什麼對象中")

    // $city = "Taipei";  // Moscaw 524901  Taipei 1668341

    $apiKey = "d072e319b5f103c7ddc58a6ffb960bd2";

    $contents = file_get_contents("https://api.openweathermap.org/data/2.5/forecast?q=".$city."&appid=".$apiKey."&lang=zh_tw"); //接到 city指定的網頁

    // $contents = file_get_contents("http://api.openweathermap.org/data/2.5/forecast?id=".$city."&APPID=".$apiKey."&lang=zh_tw");  // Taipei

    $contents = json_decode($contents, true); // 解碼，變數組

    $cityName = $contents["city"]["name"];
    $description = $contents["list"][12]["weather"][0]["description"];
    $temperature = $contents["list"][12]["main"]["temp"] - 273.15;

    // echo $contents;
    // print_r($cityName);
    // print_r($description);
    // print_r($temperature);

    $result = "城市: ".$cityName.", 天氣狀況: ".$description.", 溫度: ".$temperature."℃";

    if($cityName != ""){

      echo $result;

    }










 ?>
