# Инструкции по запуску проекта

1. Создать на основе лежащих в каждом сервисе файлов .env-example файлы с расширением .env и заполнить их необходимыми данными
2. В корневом файле package.json содержатся скрипты, необходимые для развертывания docker контейнеров, они запускаются через npm run, например

```bash
npm run account:start
```

Если надо остановить и удалить контейнер, используем команду stop, например:

```bash
npm run account:stop
```

3. Запускаем сервисы в любой последовательности командами типа

```bash
npx nx run blog:serve
```

!!! ВАЖНО !!!
Перед запуском по п.3 необходимо перейти в каталог проекта командой

```bash
cd project
```