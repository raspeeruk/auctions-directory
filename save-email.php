<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 403 Forbidden');
    exit('Access forbidden');
}

// Set the content type to JSON for the response
header('Content-Type: application/json');

// Get the email from the POST request
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('HTTP/1.1 400 Bad Request');
    exit(json_encode(['success' => false, 'message' => 'Invalid email address']));
}

// Your email address where you want to receive notifications
$to = 'andrew@twocores.com'; // Email address for notifications

// Email subject
$subject = 'New Sample Report Download';

// Email message
$message = "A new user has downloaded the sample report.\n\n";
$message .= "Email: " . $email . "\n";
$message .= "Date: " . date('Y-m-d H:i:s') . "\n";
$message .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Additional headers
$headers = 'From: website@auctionradar.co.uk' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// File path for the sample Excel spreadsheet
$file_path = 'images/Auction Radar - Sample Excel Spreadsheet.xlsx';

// Check if the file exists
if (!file_exists($file_path)) {
    error_log("Sample file not found at: $file_path");
    echo json_encode(['success' => false, 'message' => 'Sample file not found']);
    exit;
}

// Try to send the email
if (mail($to, $subject, $message, $headers)) {
    // Email sent successfully
    $response = ['success' => true, 'message' => 'Email notification sent successfully'];
} else {
    // Failed to send email
    // Log the error (in a real environment)
    error_log("Failed to send email notification for: $email");
    
    // Still return success to the user so they can download the file
    // In a production environment, you might want to implement a fallback method
    $response = ['success' => true, 'message' => 'Download processed'];
}

// Check if the client wants the file to be sent directly
$send_file = isset($_POST['send_file']) && $_POST['send_file'] === 'true';

if ($send_file) {
    // Set headers for file download
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="Auction Radar - Sample Excel Spreadsheet.xlsx"');
    header('Content-Length: ' . filesize($file_path));
    header('Cache-Control: max-age=0');
    
    // Clear the output buffer
    ob_clean();
    flush();
    
    // Output the file
    readfile($file_path);
    exit;
} else {
    // Return the response as JSON
    echo json_encode($response);
}
?>