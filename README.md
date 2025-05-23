# Pet-проект «Media Repair»

Находится в разработке

## Описание проекта

«Media Repair» — это сервисный центр, предоставляющий услуги ремонта различной техники в Орле. Проект включает в себя адаптивную верстку главной страницы, слайдер изображений и серверную часть для отправки данных пользователей на почту владельца.

На данный момент реализована адаптивная верстка главной страницы, для
разных разрешений экрана: от 320 до 1920 с несколькими брейкпоинтами.

С помощью скрипта, сделан слайдер картинок, который срабатывает на определенных разрешениях экрана.

Разработана и протестирована серверная часть, которую подключу к концу проекта: на сайте будет реализована функция отправки на почту владельца имени и номера телефона, введенных в модальном окне, которые будут оставлять пользователи.

## Основные функции

- **Адаптивная верстка**: поддерживаются разрешения экрана от 320 до 1920 пикселей с несколькими брейкпоинтами.
- **Слайдер изображений**: срабатывает на определенных разрешениях экрана, реализован с помощью JavaScript.
- **Серверная часть**: подключена и обрабатывает заявки пользователей. Данные (имя и номер телефона) отправляются на почту владельца, указанную в .env файле.
- **Динамическая таблица**: на странице «/iphones» реализована таблица, которая меняет наполнение при взаимодействии с кнопками. Данные для таблицы берутся из JSON файла (src/data/pricingDataIphones.json), обработка данных происходит через fetch. Впоследствии эта таблица будет переиспользоваться на других страницах.
- **Маска телефона**: кастомная валидация формы с применением маски номера телефона.
- **Оптимизированные слушатели событий**: слушатели навешиваются только при необходимости, например, слушатель submit активен только при открытии модального окна и удаляется при его закрытии.

## Технологии

- **HTML5**: Семантическая верстка для улучшения SEO и доступности.
- **CSS3**: Использование SCSS с относительными величинами для гибкости и удобства поддержки.
- **JavaScript**: Реализация слайдера и обработка событий.
- **Node.js**: Серверная часть для обработки запросов и отправки данных на почту.
- **Webpack**: Сборщик модулей для оптимизации и управления зависимостями проекта.

## Адаптивность

Проект разработан с учетом адаптивности, что позволяет ему корректно отображаться на различных устройствах и разрешениях экрана. Используются медиа-запросы и гибкие единицы измерения, такие как `%`, `vw`, `vh`, `rem`, и `clamp()`, чтобы обеспечить отзывчивый дизайн.

## Валидность

Код проекта проверен на соответствие стандартам W3C для HTML и CSS. Это гарантирует, что страницы будут корректно отображаться и работать в современных браузерах.

## Эластичность

Дизайн проекта разработан с учетом эластичности, что позволяет элементам интерфейса адаптироваться под различные условия отображения. Используются гибкие сетки и контейнеры, которые могут изменять свои размеры в зависимости от содержимого и разрешения экрана.

## Кроссбраузерность

Проект протестирован на совместимость с различными браузерами, включая Chrome, Firefox, Safari и Edge. Используются современные CSS-свойства с префиксами для обеспечения поддержки в старых версиях браузеров.

## Организация кода
`common.js`: содержит общую логику для всех страниц.

`table.js`: включает логику создания и наполнения таблиц, что позволяет переиспользовать её на разных страницах.

## Webpack

Для сборки проекта используется Webpack, что позволяет оптимизировать и управлять зависимостями. Webpack настроен для работы с ES6 модулями, SCSS, и минификации кода. Это обеспечивает высокую производительность и удобство разработки.

## Заключение

Проект «Media Repair» демонстрирует мои навыки в разработке адаптивных веб-приложений, использовании современных технологий и внимание к деталям. Я стремлюсь к созданию удобных и функциональных решений, которые удовлетворяют потребности пользователей и обеспечивают высокое качество обслуживания.

Спасибо за внимание!
