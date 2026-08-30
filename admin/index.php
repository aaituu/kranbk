<?php
declare(strict_types=1);

require dirname((string) $_SERVER['DOCUMENT_ROOT']) . '/private/bootstrap.php';
security_headers();
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Robots-Tag: noindex, nofollow, noarchive');

function escape(mixed $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$pdo = database();
$contacts = $pdo->query('SELECT id, name, email, phone, message, created_at FROM contacts ORDER BY created_at DESC LIMIT 200')->fetchAll();
$total = (int) $pdo->query('SELECT COUNT(*) FROM contacts')->fetchColumn();
?>
<!doctype html>
<html lang="ru-KZ">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Заявки | SA Consulting</title>
  <style>
    :root{--green:#123d32;--red:#d93832;--mint:#e4efe7;--paper:#f7f4ee;--line:#d8d8cf;--muted:#68756f}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--green);font:15px/1.5 Arial,sans-serif}.wrap{width:min(1120px,calc(100% - 28px));margin:30px auto}.top,.card,.login{background:#fff;border:1px solid var(--line);border-radius:24px}.top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 24px;margin-bottom:18px}.brand{font-weight:800;letter-spacing:.05em}.stats{color:var(--muted)}.button{border:0;border-radius:999px;background:var(--green);color:#fff;padding:11px 18px;font-weight:700;cursor:pointer}.button.red{background:var(--red)}.login{max-width:440px;margin:12vh auto;padding:32px}.login h1{margin:0 0 8px}.login p{color:var(--muted);margin:0 0 22px}label{display:block;font-weight:700;margin-top:15px}input{width:100%;border:1px solid var(--line);border-radius:12px;padding:13px;margin-top:6px;font:inherit}.error{background:#fee9e7;color:#9e211d;padding:12px 14px;border-radius:12px;margin:12px 0}.grid{display:grid;gap:14px}.card{padding:22px}.card.new{border-left:5px solid var(--red)}.head{display:flex;justify-content:space-between;gap:16px}.name{font-size:18px;font-weight:800}.date{color:var(--muted);white-space:nowrap}.contacts{display:flex;flex-wrap:wrap;gap:8px 18px;margin:8px 0}.contacts a{color:var(--green)}.message{white-space:pre-wrap;background:var(--mint);padding:14px;border-radius:14px;margin-top:14px}.actions{margin-top:14px}.empty{text-align:center;padding:50px;color:var(--muted)}@media(max-width:640px){.top,.head{align-items:flex-start;flex-direction:column}.date{white-space:normal}.wrap{margin-top:14px}.card{padding:18px}}
  </style>
</head>
<body>
  <main class="wrap">
    <header class="top">
      <div><div class="brand">SA CONSULTING</div><div class="stats">Заявки с сайта kranbk.kz · всего: <?= $total ?></div></div>
    </header>
    <section class="grid">
      <?php if (!$contacts): ?><div class="card empty">Заявок пока нет</div><?php endif; ?>
      <?php foreach ($contacts as $contact): ?>
        <?php $date = new DateTimeImmutable($contact['created_at'], new DateTimeZone('UTC')); $date = $date->setTimezone(new DateTimeZone('Asia/Almaty')); ?>
        <article class="card">
          <div class="head"><div class="name"><?= escape($contact['name']) ?></div><time class="date"><?= escape($date->format('d.m.Y H:i')) ?></time></div>
          <div class="contacts"><a href="tel:<?= escape($contact['phone']) ?>"><?= escape($contact['phone']) ?></a><?php if ($contact['email'] !== ''): ?><a href="mailto:<?= escape($contact['email']) ?>"><?= escape($contact['email']) ?></a><?php endif; ?></div>
          <?php if ($contact['message'] !== ''): ?><div class="message"><?= escape($contact['message']) ?></div><?php endif; ?>
        </article>
      <?php endforeach; ?>
    </section>
  </main>
</body>
</html>
