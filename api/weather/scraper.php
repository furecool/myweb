<?php

    error_reporting(0);

    $city = $_GET[city]; // 宣告變數 $city(和 js用 city做傳送數值的橋樑)

    $city = str_replace(" ", "-", $city); // string replace 替換參數("換","換成","什麼對象中")

    // echo @file_get_contents("https://www.weather-forecast.com/locations/London/forecasts/latest"); @類似提醒錯誤的功能，可去掉
    $contents = file_get_contents("https://www.weather-forecast.com/locations/".$city."/forecasts/latest"); //接到 city指定的網頁

    preg_match("/\"phrase\">(.*?)<\/span>/i", $contents, $matches); //把限定範圍內容傳到 array中

    echo $matches[1]; //呼叫 array的元素


 ?>
