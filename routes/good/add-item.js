const WorkerTableGood = require('../../services/worker-tables/goods')
// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({ dest: 'uploads/' })
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
	app.post('/goods/add', fileFromForm, function (req, res) {
		// тут не можем читать данные с формы без дополнительных плагинов
		const data = {
			ID: uuid.v4(),
			TITLE: req.body.TITLE,
			DISCR: req.body.DISCR,
			PRICE: req.body.PRICE,
			IMG: req.body.IMG,
			COUNT: req.body.COUNT,
		}

		const workerTableGood = new WorkerTableGood(res, req)
		workerTableGood.add(data)
	})
	//Сгенерировать запрос для добавления товара в БД
	// INSERT - добавление в БД

	/**
	 * Вспомогательный маршрут для добавления одного товара:
	 * Автор: Румянцев Александр
	 * Описание: Выводить форму на интейфейс для добавления товара
	 * Версия: v1
	 * Метод: GET
	 * Пример работы с запросом:
	 * Ввести в адресную строку - http://localhost:3000/form_add_item
	 */

	app.get('/form_add_item', function (req, res) {
		res.send(
			`
                <h1>
                    Тестовая форма для маршрута - goods/add
                </h1>
                <form enctype="multipart/form-data" action='/goods/add' method='post'>
                    <input placeholder="TITLE" type="text" name="TITLE"/>
                    <input placeholder="DISCR" type="text" name="DISCR"/>
                    <input placeholder="PRICE" type="text" name="PRICE"/>
                    <input placeholder="IMG" type="text" name="IMG"/>
                    <input placeholder="COUNT" type="text" name="COUNT"/>
                    <input type='submit' value="Добавить"/>
                </form>
            `
		)
	})
}
