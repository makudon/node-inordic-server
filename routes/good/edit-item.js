const WorkerTableGood = require('../../services/worker-tables/goods')
// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({ dest: 'uploads/' })
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
	app.post('/goods/edit', fileFromForm, function (req, res) {
		const data = {
			ID: req.body.ID,
			TITLE: req.body.TITLE,
			DISCR: req.body.DISCR,
			PRICE: req.body.PRICE,
			IMG: req.body.IMG,
			COUNT: req.body.COUNT,
		}

		const workerTableGood = new WorkerTableGood(res, req)
		workerTableGood.update(data)
	})

	app.get('/form_edit_item', function (req, res) {
		res.send(
			`
                <h1>
                    Тестовая форма для маршрута - goods/edit
                </h1>
                <form enctype="multipart/form-data" action='/goods/edit' method='post'>
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
