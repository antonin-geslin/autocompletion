<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <header>
        <form autocomplete="off" method = "GET" action="recherche.php">
            <div class="autocomplete">
                <input id="myInput" type="text" name="Country" placeholder="Country">
            </div>
            <input type="submit" placeholder="Search">
        </form>
    </header>
</body>
</html>


<?php 
$pdo = new PDO('mysql:host=localhost;dbname=autocompletion', 'root', 'root');

$requete = $pdo->prepare("SELECT id, nom, habitants FROM pays");
$requete->execute();
$data = $requete->fetchAll(PDO::FETCH_ASSOC);
$jsondata = json_encode($data);
file_put_contents('data.json', $jsondata);
?>