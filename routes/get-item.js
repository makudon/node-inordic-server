/**
 * Маршрут для получения одного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с одним товаром
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_item?id=1
 */

module.exports = (app, connect) => app.get('/get_item', function (req, res) {
    // Получаем поле id bз объекта request
    const {id} = req.query
    console.log(id)
    // Сформировать новый запрос на получение одного товара
    // Запрос отличается от предыдущего только конструкцием WHERE ID = id
    // Где WHERE дословно переводится как слово - ГДЕ
    // Далее идет условие, поле в БД ID = id(переменная, полученная выше)
    const sql = `SELECT * FROM goods WHERE ID=${id}`
    // Отправляем запрос
    connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify(result))
        }
    )
})
