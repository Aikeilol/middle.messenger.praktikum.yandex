## Описание
Проект веб-чат

Ссылка на макеты https://www.figma.com/file/iao9pvb55ebBbXVFpXDEmK/chat?type=design&node-id=0%3A1&mode=design&t=jwoGlRX6g4EBmG5H-1
Ссылка на задеплоенный проект https://deploy--bucolic-dasik-d3befe.netlify.app/
Страница регистрации https://deploy--bucolic-dasik-d3befe.netlify.app/src/pages/registration/index.html
Страница авторизации https://deploy--bucolic-dasik-d3befe.netlify.app/src/pages/authorization/index.html
Страница 404 https://deploy--bucolic-dasik-d3befe.netlify.app/src/pages/404/index.html
Страница 500 https://deploy--bucolic-dasik-d3befe.netlify.app/src/pages/500/index.html

Все компоненты - это функции которые возвращают html в типе string для дальнейшего размещения html в документ
через innerHtml.

В src/components лежат общие компоненты, компоненты которые нужны конкретному модулю лежат в папке этого модуля

В src/scss лежат общие стили, например: ресет дефолтных стилей браузера

В src/pages лежат страницы проекта, в дальнейшем будет переход проекта на SPA и выпил библиотеки handelbars,
т.к она не особо полезна на клиенте


## Запуск и билд проекта
- `npm run dev` — запуск в режиме разработки,
- `npm run start` — сборка проекта и запуск в режиме разработчика,
- `npm run build` — сборка проекта.
