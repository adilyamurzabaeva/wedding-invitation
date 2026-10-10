# Настройка DNS для wedding.patatoyes.com

## Инструкция по настройке DNS

Для работы сайта на поддомене `wedding.patatoyes.com` необходимо добавить DNS запись в настройках домена patatoyes.com.

### Шаг 1: Войдите в панель управления DNS

Зайдите в панель управления DNS вашего регистратора (например, Cloudflare, Route53, или другой).

### Шаг 2: Добавьте CNAME запись

Создайте новую запись со следующими параметрами:

```
Тип:     CNAME
Имя:     wedding
Значение: adilyamurzabaeva.github.io
TTL:     Auto или 3600
```

**Важно:** В поле "Имя" указывайте только `wedding` (без .patatoyes.com), система автоматически добавит основной домен.

### Шаг 3: Проверьте DNS

После добавления записи, подождите 5-15 минут для распространения DNS. Проверить можно командой:

```bash
dig wedding.patatoyes.com
```

Должен вернуться ответ с CNAME на `adilyamurzabaeva.github.io`.

### Шаг 4: Проверьте HTTPS

GitHub Pages автоматически настроит HTTPS сертификат для вашего поддомена. Это может занять до 24 часов после настройки DNS.

Проверить статус можно в настройках репозитория:
https://github.com/adilyamurzabaeva/wedding-invitation/settings/pages

## Текущий статус

- ✅ Репозиторий: https://github.com/adilyamurzabaeva/wedding-invitation
- ✅ GitHub Pages включен
- ✅ Custom domain настроен: wedding.patatoyes.com
- ⏳ Ожидается настройка DNS
- ⏳ HTTPS сертификат (после настройки DNS)

## Альтернативная ссылка (временная)

Пока DNS не настроен, сайт доступен по адресу:
https://adilyamurzabaeva.github.io/wedding-invitation/

## Примеры настройки для популярных провайдеров

### Cloudflare
1. DNS → Add Record
2. Type: CNAME
3. Name: wedding
4. Target: adilyamurzabaeva.github.io
5. Proxy status: DNS only (серая иконка облака)
6. Save

### Amazon Route53
1. Hosted zones → patatoyes.com
2. Create record
3. Record name: wedding
4. Record type: CNAME
5. Value: adilyamurzabaeva.github.io
6. Create records

### GoDaddy
1. DNS Management
2. Add → CNAME
3. Name: wedding
4. Value: adilyamurzabaeva.github.io
5. TTL: 600 seconds
6. Save

## Проверка работы

После настройки DNS сайт будет доступен по адресу:
**https://wedding.patatoyes.com**

Проверьте:
- Открывается ли сайт
- Работает ли HTTPS (зеленый замок в браузере)
- Обратный отсчет до 27 июля 2027
- Форма RSVP
