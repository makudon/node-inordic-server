// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
// устанавливаем название файла в форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require('uuid')

/**
 * Маршрут для добавления одного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями которые описывают успешное добавление товара из БД
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 */

module.exports = (app, connect) => {
    app.post ('/add_item', fileFromForm ,function (req, res){
    // тут не можем читать данные с формы без дополнительных плагинов
        const id = uuid.v4()
        const title = req.body.TITLE
        const discr = req.body.DISCR
        const price = req.body.PRICE
        const img = req.body.IMG
        const count = req.body.COUNT


        //Сгенерировать запрос для добавления товара в БД
        // INSERT - добавление в БД
        const sql = 'INSERT INTO `goods`(`ID`, `TITLE`, `DISCR`, `PRICE`, `IMG`, `COUNT`) ' +
            'VALUES("'+ id +'", "'+ title +'", "'+ discr +'", "'+ price +'", "'+ img +'", "'+ count +'")'

        connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify((result)))
        })

})

/**
 * Вспомогательный маршрут для добавления одного товара:
 * Автор: Румянцев Александр
 * Описание: Выводить форму на интейфейс для добавления товара
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/form_add_item
 */

app.get ('/form_add_item', function (req, res){
    res.send(
        `
                <h1>
                    Тестовая форма для маршрута - add_item
                </h1>
                <form enctype="multipart/form-data" action='/add_item' method='post'>
                    <input type="text" name="TITLE"/>
                    <input type="text" name="DISCR"/>
                    <input type="text" name="PRICE"/>
                    <input type="text" name="COUNT"/>
                    <input type="text" name="IMG"/>
                    <input type='submit' value="Добавить"/>
                </form>
            `
    )
})
}
