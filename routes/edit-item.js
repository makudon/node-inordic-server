// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
// устанавливаем название файла в форме
const fileFromForm = uploadFromForm.single('MYFILE')

/**
 * Вспомогательный маршрут для редактирования одного товара:
 * Автор: Румянцев Александр
 * Описание: Выводить форму на редактирования для добавления товара
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/
 */

module.exports = (app, connect) => {
    app.post ('/edit_item', fileFromForm ,function(req, res){
        const id = req.body.ID
        const title = req.body.TITLE
        const discr = req.body.DISCR
        const price = req.body.PRICE
        const img = req.body.IMG
        const count = req.body.COUNT

        //ДЗ оптимизировать формиравание строки SQL
        const sql = "UPDATE `goods` SET `TITLE`='"+ title +"', `DISCR`='"+ discr +"', " +
            "`PRICE`='"+ price +"', `IMG`='"+ img +"', `COUNT`='"+ count +"' WHERE `ID` = '"+ id +"'"

        connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify((result)))
        })
})


app.get ('/form_edit_item', function (req, res){
    res.send(
        `
                <h1>
                    Тестовая форма для маршрута - edit_item
                </h1>
                <form enctype="multipart/form-data" action='/edit_item' method='post'>
                    <input placeholder="ID" type="text" name="ID"/>
                    <input placeholder="TITLE" type="text" name="TITLE"/>
                    <input placeholder="DISCR" type="text" name="DISCR"/>
                    <input placeholder="PRICE" type="text" name="PRICE"/>
                    <input placeholder="COUNT" type="text" name="COUNT"/>
                    <input placeholder="IMG" type="text" name="IMG"/>
                    <input type='submit' value="Добавить"/>
                </form>
            `
    )
})
}