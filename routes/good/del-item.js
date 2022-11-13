/**
 * Маршрут для удаления одного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями которые описывают успешное удаление товара из БД
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/del_item?id=1
 */

module.exports = (app, connect) => app.get('/del_item', function (req, res){
    const {id} = req.query
    // Сформировать запрос к БД
    // Тот же самый запрос как и в роуте для одного товара
    // только новое ключевое слово DELETE
    const sql = `DELETE FROM goods WHERE ID='${id}'`
    connect.query(sql, (err, result) => {
        result.ourMessage = "Объект удален, либо его нет в БД"
        err ? res.send(err) : res.send(JSON.stringify(result))
    })
})


