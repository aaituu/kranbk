<?php
declare(strict_types=1);

require dirname((string) $_SERVER['DOCUMENT_ROOT']) . '/private/bootstrap.php';
security_headers();
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Robots-Tag: noindex, nofollow, noarchive');

session_name('kranbk_admin');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/admin',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

function escape(mixed $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function csrf_token(): string
{
    if (!isset($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
    }
    return (string) $_SESSION['csrf'];
}

function valid_csrf(): bool
{
    return isset($_POST['csrf'], $_SESSION['csrf'])
        && is_string($_POST['csrf'])
        && hash_equals((string) $_SESSION['csrf'], $_POST['csrf']);
}

$error = '';
$action = $_POST['action'] ?? '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!valid_csrf()) {
        $error = 'Сессия устарела. Обновите страницу.';
    } elseif ($action === 'login') {
        $login = text_value($_POST['login'] ?? '', 160);
        $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
        $lockedUntil = (int) ($_SESSION['locked_until'] ?? 0);

        if ($lockedUntil > time()) {
            $error = 'Слишком много попыток. Повторите вход через несколько минут.';
        } elseif (hash_equals(ADMIN_LOGIN, $login) && password_verify($password, ADMIN_PASSWORD_HASH)) {
            session_regenerate_id(true);
            $_SESSION['authenticated'] = true;
            $_SESSION['login_attempts'] = 0;
            header('Location: /admin/');
            exit;
        } else {
            $attempts = (int) ($_SESSION['login_attempts'] ?? 0) + 1;
            $_SESSION['login_attempts'] = $attempts;
            if ($attempts >= 7) {
                $_SESSION['locked_until'] = time() + 600;
            }
            usleep(500000);
            $error = 'Неверный логин или пароль.';
        }
    } elseif ($action === 'logout') {
        $_SESSION = [];
        session_destroy();
        header('Location: /admin/');
        exit;
    } elseif ($action === 'read' && !empty($_SESSION['authenticated'])) {
        $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT);
        if ($id) {
            $statement = database()->prepare('UPDATE contacts SET is_read = 1 WHERE id = :id');
            $statement->execute(['id' => $id]);
        }
        header('Location: /admin/');
        exit;
    } elseif ($action === 'delete' && !empty($_SESSION['authenticated'])) {
        $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT);
        if ($id) {
            $statement = database()->prepare('DELETE FROM contacts WHERE id = :id');
            $statement->execute(['id' => $id]);
        }
        header('Location: /admin/');
        exit;
    }
}

$authenticated = !empty($_SESSION['authenticated']);
$contacts = [];
$total = 0;
$unread = 0;
if ($authenticated) {
    $pdo = database();
    $contacts = $pdo->query('SELECT id, name, email, phone, message, is_read, created_at FROM contacts ORDER BY created_at DESC LIMIT 200')->fetchAll();
    $total = (int) $pdo->query('SELECT COUNT(*) FROM contacts')->fetchColumn();
    $unread = (int) $pdo->query('SELECT COUNT(*) FROM contacts WHERE is_read = 0')->fetchColumn();
}
?>
<!doctype html>
<html lang="ru-KZ">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title><?= $authenticated ? 'Заявки' : 'Вход' ?> | SA Consulting</title>
  <style>
    :root{--green:#123d32;--red:#d93832;--mint:#e4efe7;--paper:#f7f4ee;--line:#d8d8cf;--muted:#68756f}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--green);font:15px/1.5 Arial,sans-serif}.wrap{width:min(1120px,calc(100% - 28px));margin:30px auto}.top,.card,.login{background:#fff;border:1px solid var(--line);border-radius:24px}.top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 24px;margin-bottom:18px}.brand{font-weight:800;letter-spacing:.05em}.stats{color:var(--muted)}.button{border:0;border-radius:999px;background:var(--green);color:#fff;padding:11px 18px;font-weight:700;cursor:pointer}.button.red{background:var(--red)}.login{max-width:440px;margin:12vh auto;padding:32px}.login h1{margin:0 0 8px}.login p{color:var(--muted);margin:0 0 22px}label{display:block;font-weight:700;margin-top:15px}input{width:100%;border:1px solid var(--line);border-radius:12px;padding:13px;margin-top:6px;font:inherit}.error{background:#fee9e7;color:#9e211d;padding:12px 14px;border-radius:12px;margin:12px 0}.grid{display:grid;gap:14px}.card{padding:22px}.card.new{border-left:5px solid var(--red)}.head{display:flex;justify-content:space-between;gap:16px}.name{font-size:18px;font-weight:800}.date{color:var(--muted);white-space:nowrap}.contacts{display:flex;flex-wrap:wrap;gap:8px 18px;margin:8px 0}.contacts a{color:var(--green)}.message{white-space:pre-wrap;background:var(--mint);padding:14px;border-radius:14px;margin-top:14px}.actions{margin-top:14px}.empty{text-align:center;padding:50px;color:var(--muted)}@media(max-width:640px){.top,.head{align-items:flex-start;flex-direction:column}.date{white-space:normal}.wrap{margin-top:14px}.card{padding:18px}}
  </style>
</head>
<body>
<?php if (!$authenticated): ?>
  <main class="wrap">
    <section class="login">
      <div class="brand">SA CONSULTING</div>
      <h1>Вход в админку</h1>
      <p>Заявки с сайта kranbk.kz</p>
      <?php if ($error !== ''): ?><div class="error"><?= escape($error) ?></div><?php endif; ?>
      <form method="post" action="/admin/" autocomplete="off">
        <input type="hidden" name="action" value="login">
        <input type="hidden" name="csrf" value="<?= escape(csrf_token()) ?>">
        <label>Логин<input type="email" name="login" required autocomplete="username"></label>
        <label>Пароль<input type="password" name="password" required autocomplete="current-password"></label>
        <button class="button red" type="submit" style="width:100%;margin-top:22px">Войти</button>
      </form>
    </section>
  </main>
<?php else: ?>
  <main class="wrap">
    <header class="top">
      <div><div class="brand">SA CONSULTING</div><div class="stats">Всего заявок: <?= $total ?> · новых: <?= $unread ?></div></div>
      <form method="post" action="/admin/"><input type="hidden" name="action" value="logout"><input type="hidden" name="csrf" value="<?= escape(csrf_token()) ?>"><button class="button" type="submit">Выйти</button></form>
    </header>
    <section class="grid">
      <?php if (!$contacts): ?><div class="card empty">Заявок пока нет</div><?php endif; ?>
      <?php foreach ($contacts as $contact): ?>
        <?php $date = new DateTimeImmutable($contact['created_at'], new DateTimeZone('UTC')); $date = $date->setTimezone(new DateTimeZone('Asia/Almaty')); ?>
        <article class="card <?= (int) $contact['is_read'] === 0 ? 'new' : '' ?>">
          <div class="head"><div class="name"><?= escape($contact['name']) ?><?= (int) $contact['is_read'] === 0 ? ' · Новая' : '' ?></div><time class="date"><?= escape($date->format('d.m.Y H:i')) ?></time></div>
          <div class="contacts"><a href="tel:<?= escape($contact['phone']) ?>"><?= escape($contact['phone']) ?></a><?php if ($contact['email'] !== ''): ?><a href="mailto:<?= escape($contact['email']) ?>"><?= escape($contact['email']) ?></a><?php endif; ?></div>
          <?php if ($contact['message'] !== ''): ?><div class="message"><?= escape($contact['message']) ?></div><?php endif; ?>
          <div class="actions" style="display:flex;gap:8px;flex-wrap:wrap">
            <?php if ((int) $contact['is_read'] === 0): ?><form method="post" action="/admin/"><input type="hidden" name="action" value="read"><input type="hidden" name="id" value="<?= (int) $contact['id'] ?>"><input type="hidden" name="csrf" value="<?= escape(csrf_token()) ?>"><button class="button" type="submit">Отметить прочитанной</button></form><?php endif; ?>
            <form method="post" action="/admin/" onsubmit="return confirm('Удалить эту заявку без возможности восстановления?')"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?= (int) $contact['id'] ?>"><input type="hidden" name="csrf" value="<?= escape(csrf_token()) ?>"><button class="button red" type="submit">Удалить</button></form>
          </div>
        </article>
      <?php endforeach; ?>
    </section>
  </main>
<?php endif; ?>
</body>
</html>
