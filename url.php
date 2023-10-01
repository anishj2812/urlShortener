<?php
    $url=$_POST["url"];
    $api_url = "http://localhost:12377/inserturl/" . urlencode($url);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // Execute cURL session and store the response
    $response = curl_exec($ch);

    // Check for cURL errors
    if(curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    }
    // Close cURL session
    curl_close($ch);

    // Handle the response
    // echo "API Response: " . $response;
    $responseData = json_decode($response, true);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>mini.url</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  </head>
  <body>
    <!-- <h1>Hello, world!</h1> -->
    <div class="container">
      <h1 class="text-center p-4">mini.url</h1>
      <div class="text_url" id="short_url"><?php echo  $responseData['generatedURL'] ?></div>
      <div class="text_box"> 
        <a href="https://twitter.com" target="_blank">
            <div class="text_ele"><i class="fab fa-twitter"></i></div>
          </a>
        <div class="text_ele cursor-pointer" onclick="copyToClipboard()">
        Click to copy
        </div>
        <a href="https://www.facebook.com" target="_blank">
            <div class="text_ele"><i class="fab fa-facebook"></i></div>
          </a>
      </div>
    </div>
    <footer>
      <div class="container m-10 text-center p-4">
          <p>&copy; 2023 mini.url All rights reserved.</p>
      </div>
    </footer>
    <!-- <script src="script.js"> -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
</html>
