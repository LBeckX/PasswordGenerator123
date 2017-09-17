<!DOCTYPE html>
<html lang="en">
<head>
    <title>PasswordGenerator123 - webitfactory.com</title>
    <meta name="description" content="Create your own password fast and safe with html5">
    <meta charset="utf-8">
    <meta name="author" content="Lukas Beck <lb(at)webitfactory.com>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="files/favicon/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="57x57" href="files/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="files/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="files/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="files/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="files/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="files/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="files/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="files/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="files/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="files/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="files/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="files/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="files/favicon/favicon-16x16.png">
    <link rel="manifest" href="files/favicon/manifest.json">
    <meta name="theme-color" content="#ffffff">
    <meta name="robots" content="index,follow" />
    <meta name="language" content="en">
    <meta name="keywords" content="passwort,password,create,en,de,github,lbeckx,javascript,html5,html">
    <meta property="og:title" content="PasswordGenerator123 - webitfactory.com">
    <meta property="og:url" content="//passwortgenerator.webitfactory.com/">
    <meta property="og:image" content="/files/img/pro_passwordGen.jpg">
    <meta property="og:description" content="Create your own password fast and safe with html5">
    <meta property="og:type"   content="website">
    <?php
        echo "<style>";
        echo preg_replace('/\s+/', " ",file_get_contents(__DIR__."/files/css/design.css"));
        echo preg_replace('/\s+/', " ",file_get_contents("https://fonts.googleapis.com/css?family=Roboto:300,300i"));
        echo "</style>";
    ?>
</head>
<body>
<div id="LEFT" class="infoBoxClose">
    <div id="HEADER"><h1>PasswordGenerator123</h1></div>
    <p class="white">Nr. / Used / Password</p>
    <div id="BOX"></div>
</div>

<div id="RIGHT" class="infoBoxClose">
    <form id="GENERATOR_FORM">

        <div class="form_input">
            <label for="INPUT_PASSWORD_NUMBERS">Number of passwords</label>
            <select id="INPUT_PASSWORD_NUMBERS" name="inputPasswordNumbers" size="1">
                <option value="1">1</option>
                <option value="4">4</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
            </select>
        </div>

        <div class="form_input checkbox">
            <label for="INPUT_LOWERCASE_LETTERS">Allow lowercase letters [abcdefghijklmnopqrstuvwxyz]</label>
            <input type="checkbox" name="inputLowercaseLetters" id="INPUT_LOWERCASE_LETTERS">
        </div>

        <div class="form_input checkbox">
            <label for="INPUT_UPPERCASE_LETTERS">Allow uppercase letters [ABCDEFGHIJKLMNOPQRSTUVWXYZ]</label>
            <input type="checkbox" name="inputUppercaseLetters" id="INPUT_UPPERCASE_LETTERS">
        </div>

        <div class="form_input checkbox">
            <label for="INPUT_NUMBERS_LETTER">Allow numbers [1234567890]</label>
            <input type="checkbox" name="inputNumbersLetters" id="INPUT_NUMBERS_LETTER">
        </div>

        <div class="form_input checkbox">
            <label for="INPUT_SPECIAL_CHARACTER">Allow special character</label>
            <input type="checkbox" name="inputSpecialCharacter" id="INPUT_SPECIAL_CHARACTER">
        </div>

        <div class="form_input">
            <label for="INPUT_ALLOW_SPECIAL_CHARACTER">Allow special character [!?@(){}[]\/=~$%&#*-+.,_]</label>
            <input type="text" name="inputAllowSpecialCharacter" id="INPUT_ALLOW_SPECIAL_CHARACTER" placeholder="!?@(){}[]\/=~$%&#*-+.,_" maxlength="50">
        </div>

        <div class="form_input">
            <label for="INPUT_PASSWORD_LENGTH">Password length</label>
            <input type="text" name="inputPasswordLength" id="INPUT_PASSWORD_LENGTH" placeholder="8" maxlength="10">
        </div>
    </form>
    <div class="option_present">
        <button id="CREATE_OPTION">Create New</button>
    </div>
</div>
<div id="OUTPUT_MSG"></div>
<button id="OPEN_INFO">Informations</button>
<div id="INFO_BOX">
    <div class="closeButton infoBoxClose">X</div>
    <div class="head">You can find me here:</div>
    <div class="mid">
        <div class="fb">
            <a target="_blank" href="//www.facebook.com/lukas.beck36"></a>
        </div>
        <div class="github">
            <a target="_blank" href="//github.com/LBeckX"></a>
        </div>
        <div class="homepage">
            <a target="_blank" href="//www.unitgreen.com"></a>
        </div>
        <div class="homepage2">
            <a target="_blank" href="//www.webitfactory.com"></a>
        </div>
    </div>
    <div class="footer">
        Contact: <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#108;&#098;&#064;&#117;&#110;&#105;&#116;&#103;&#114;&#101;&#101;&#110;&#046;&#099;&#111;&#109;">lb(at)unitgreen.com</a>
        <br>
        <a href="//www.unitgreen.com/meta/impressum.php">Impressum / Datenschutz</a>
    </div>
</div>
</body>
<?php
echo "<script type=\"text/javascript\">";
echo preg_replace('/\s+/', " ",file_get_contents(__DIR__."/files/js/generate.js"));
echo "</script>"
?>
<style>
    body{
        background: #292929 url("/files/img/background_web.jpg") no-repeat scroll center center;
    }
</style>
</html>