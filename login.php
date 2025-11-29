<?php
// Session ကို စတင်သည် (အသုံးပြုသူ ဝင်ထား/မဝင်ထား သိအောင်)
session_start();

// သတ်မှတ်ထားသော Username & Password
$valid_username = "koko";
$valid_password = "thae";

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Username နဲ့ Password ကို စစ်ဆေးသည်
    if ($username === $valid_username && $password === $valid_password) {
        // မှန်ကန်ပါက session သတ်မှတ်ပြီး dashboard.php ကို ပို့သည်
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Username (သို့မဟုတ်) Password မှားနေပါသည်။";
    }
}
?>
<!DOCTYPE html>
<html lang="my">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login စာမျက်နှာ</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Login စာမျက်နှာအတွက် သီးသန့် CSS */
        body {
            background-color: #222;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            width: 300px;
            text-align: center;
        }
        .login-container h2 {
            margin-bottom: 20px;
            color: #333;
        }
        .login-container input[type="text"],
        .login-container input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .login-container button {
            width: 100%;
            background-color: #f7a800; /* ပုံထဲက ခလုတ်အရောင်လို */
            color: black;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .login-container button:hover {
            background-color: #e69500;
        }
        .error {
            color: red;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <?php if ($error): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        <form action="login.php" method="POST">
            <input type="text" name="username" placeholder="Username (koko)" required>
            <input type="password" name="password" placeholder="Password (thae)" required>
            <button type="submit">ဝင်မည်</button>
        </form>
    </div>
</body>
</html>
