<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 403 Forbidden');
    exit('Access forbidden');
}

// Get the email from the POST request
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('HTTP/1.1 400 Bad Request');
    exit(json_encode(['success' => false, 'message' => 'Invalid email address']));
}

// Path to the JSON file
$jsonFile = 'emails.json';

// Read the current emails
if (file_exists($jsonFile)) {
    $jsonData = json_decode(file_get_contents($jsonFile), true);
    if (!$jsonData) {
        $jsonData = ['emails' => []];
    }
} else {
    $jsonData = ['emails' => []];
}

// Check if email already exists
if (!in_array($email, $jsonData['emails'])) {
    // Add the new email
    $jsonData['emails'][] = $email;
    
    // Save the updated data
    if (file_put_contents($jsonFile, json_encode($jsonData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Email saved successfully']);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['success' => false, 'message' => 'Failed to save email']);
    }
} else {
    // Email already exists
    echo json_encode(['success' => true, 'message' => 'Email already registered']);
}
?>