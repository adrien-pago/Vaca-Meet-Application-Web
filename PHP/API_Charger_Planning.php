<?php

include 'config.php';

try {
    $id_camping = $_GET['id_camping'];

    if (empty($id_camping)) {
        throw new Exception('ID du camping manquant');
    }

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
        SELECT 
            a.NOM_ACTIVITE AS title, 
            p.DATE_HEURE_DEBUT AS start, 
            p.DATE_HEURE_FIN AS end
        FROM PLANNING p
        JOIN ACTIVITE_CAMPING ac ON ac.ID_PLANNING = p.ID_PLANNING
        JOIN CAMPING c ON c.ID_CAMPING = ac.ID_CAMPING
        JOIN ACTIVITE a on a.ID_ACTVITE = ac.ID_ACTVITE
        JOIN STRUCTURE s on s.ID_STRUCTURE = a.ID_STRUCTURE
        WHERE s.ID_CAMPING = :id_camping
    ");
    $stmt->bindParam(':id_camping', $id_camping);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir les résultats en format attendu par FullCalendar
    $events = array_map(function ($result) {
        return [
            'title' => $result['title'],
            'start' => $result['start'],
            'end' => $result['end'] // Assurez-vous que cette colonne existe dans votre base de données
        ];
    }, $results);

    echo json_encode($events);

} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
