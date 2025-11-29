<?php
session_start();
session_unset(); // session variables တွေ အားလုံးကို ဖျက်သည်
session_destroy(); // session ကို ဖျက်ဆီးသည်
header("Location: login.php"); // Login စာမျက်နှာကို ပြန်ပို့သည်
exit;
?>
