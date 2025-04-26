<?php
// API Key یوتیوب
$apiKey = 'AIzaSyAIGnjehJB493p0rX57Nfqf-NPSp0IQUog';
// ID ویدیو
$videoId = 'Vy13K_FRkJ8';

// URL برای ارسال درخواست به API یوتیوب
$url = "https://www.googleapis.com/youtube/v3/videos?id=$videoId&key=$apiKey&part=snippet,contentDetails,statistics";

// ارسال درخواست به API
$response = file_get_contents($url);
$data = json_decode($response, true);

// بررسی وضعیت درخواست و نمایش اطلاعات
if (isset($data['items'][0])) {
    $video = $data['items'][0];
    $title = $video['snippet']['title'];
    $description = $video['snippet']['description'];
    $publishedAt = $video['snippet']['publishedAt'];
    $viewCount = $video['statistics']['viewCount'];
    $likeCount = $video['statistics']['likeCount'];
    $dislikeCount = $video['statistics']['dislikeCount'];
} else {
    $title = 'ویدیو یافت نشد';
    $description = 'هیچ توضیحی برای این ویدیو موجود نیست.';
    $publishedAt = 'نامشخص';
    $viewCount = 0;
    $likeCount = 0;
    $dislikeCount = 0;
}
?>

<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اطلاعات ویدیو یوتیوب</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            direction: rtl;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .video-info {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .video-info h1 {
            font-size: 24px;
            color: #333;
        }
        .video-info p {
            font-size: 18px;
            color: #555;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="video-info">
        <h1>عنوان ویدیو: <?php echo $title; ?></h1>
        <p><strong>توضیحات:</strong> <?php echo $description; ?></p>
        <p><strong>تاریخ بارگذاری:</strong> <?php echo $publishedAt; ?></p>
        <p><strong>تعداد بازدیدها:</strong> <?php echo $viewCount; ?></p>
        <p><strong>تعداد لایک‌ها:</strong> <?php echo $likeCount; ?></p>
        <p><strong>تعداد دیسلایک‌ها:</strong> <?php echo $dislikeCount; ?></p>
    </div>
</body>
</html>
