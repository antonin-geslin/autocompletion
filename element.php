
<?php 
    $pdo = new PDO('mysql:host=localhost;dbname=autocompletion', 'root', 'root');

    $requete = $pdo->prepare("SELECT id, nom, habitants FROM pays");
    $requete->execute();
    $data = $requete->fetchAll(PDO::FETCH_ASSOC);
    $jsondata = json_encode($data);
    file_put_contents('data.json', $jsondata);
?>

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
        <form autocomplete="off">
            <div class="autocomplete" >
                <input id="myInput" type="text" name="myCountry" placeholder="Country">
            </div>
            <input type="submit" placeholder="Search">
        </form>
    </header>
    <div class="tab">
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Nombre d'habitants</th>
            </tr>
        </thead>
        <tbody>
    <?php 
        $json_file = file_get_contents('data.json');
        $json = json_decode($json_file, true);
        if (isset($_GET['id'])) {
            foreach ($json as $item) {
                if ($item['id'] == $_GET['id']) {
                    echo '<tr>';
                    echo '<td>'.$item['nom'].'</td>';
                    echo '<td>'.$item['habitants'].'</td>';
                    echo '<tr>';
                }
            }
        }
    ?>
                </tbody>
        </table>
    </div>
</body>
</html>