<?php
declare(strict_types=1);

require dirname((string) $_SERVER['DOCUMENT_ROOT']) . '/private/bootstrap.php';
security_headers();
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    json_response(['error' => 'Method not allowed'], 405);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (!str_starts_with(strtolower($contentType), 'application/json')) {
    json_response(['error' => 'Ожидается JSON-запрос.'], 415);
}

try {
    $payload = json_decode((string) file_get_contents('php://input'), true, 16, JSON_THROW_ON_ERROR);
} catch (Throwable) {
    json_response(['error' => 'Некорректные данные.'], 400);
}

if (!is_array($payload)) {
    json_response(['error' => 'Некорректные данные.'], 400);
}

// Скрытое поле-ловушка для автоматического спама.
if (text_value($payload['website'] ?? '', 200) !== '') {
    json_response(['ok' => true], 201);
}

$name = text_value($payload['name'] ?? '', 100);
$phone = text_value($payload['phone'] ?? '', 40);
$email = text_value($payload['email'] ?? '', 160);
$message = text_value($payload['message'] ?? '', 3000);

if (mb_strlen($name) < 2) {
    json_response(['error' => 'Укажите имя.'], 422);
}
if (mb_strlen($phone) < 7 || !preg_match('/^[0-9+()\-\s]+$/', $phone)) {
    json_response(['error' => 'Укажите корректный номер телефона.'], 422);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Укажите корректный e-mail.'], 422);
}

try {
    $pdo = database();
    $ipHash = client_ip_hash();
    $rate = $pdo->prepare(
        "SELECT COUNT(*) FROM contacts WHERE ip_hash = :ip AND created_at >= datetime('now', '-10 minutes')"
    );
    $rate->execute(['ip' => $ipHash]);
    if ((int) $rate->fetchColumn() >= 5) {
        json_response(['error' => 'Слишком много заявок. Повторите попытку позднее.'], 429);
    }

    $insert = $pdo->prepare(
        'INSERT INTO contacts (name, email, phone, message, ip_hash) VALUES (:name, :email, :phone, :message, :ip)'
    );
    $insert->execute([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'message' => $message,
        'ip' => $ipHash,
    ]);
} catch (Throwable $error) {
    error_log('[contact] ' . $error->getMessage());
    json_response(['error' => 'Не удалось сохранить заявку. Позвоните нам или напишите в WhatsApp.'], 500);
}

json_response(['ok' => true, 'id' => (int) $pdo->lastInsertId()], 201);
