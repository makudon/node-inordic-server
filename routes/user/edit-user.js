// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({ dest: 'uploads/' })
// устанавливаем название файла в форме
const fileFromForm = uploadFromForm.single('MYFILE')

const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app, connect) => {
	app.post('/users/edit_user', fileFromForm, function (req, res) {
		// тут не можем читать данные с формы без дополнительных плагинов

		const data = {
			ID: req.body.ID,
			NAME: req.body.NAME,
			SURNAME: req.body.SURNAME,
			EMAIL: req.body.EMAIL,
			IMG: req.body.IMG,
			PHONE: req.body.PHONE,
			LOGIN: req.body.LOGIN,
			PASSWORD: req.body.PASSWORD,
			ROLE: req.body.ROLE,
		}

		//инициализируем объект класс workertableuser  при этом ему передаем в конструктор
		const workerTableUser = new WorkerTableUser(res, req)
		//добавляем пользователя через воркер
		workerTableUser.update(data)

		// const id = uuid.v4()
		// const name = req.body.NAME
		// const surname = req.body.SURNAME
		// const email = req.body.EMAIL
		// const img = req.body.IMG
		// const phone = req.body.PHONE
		// const login = req.body.LOGIN
		// const password = req.body.PASSWORD
		// const role = req.body.ROLE

		//Сгенерировать запрос для добавления товара в БД
		// INSERT - добавление в БД
		// 	const sql =
		// 		'INSERT INTO `users`(`ID`, `NAME`, `SURNAME`, `IMG`, `EMAIL`, `PHONE`, `LOGIN`, `PASSWORD`, `ROLE`) ' +
		// 		'VALUES("' +
		// 		id +
		// 		'", "' +
		// 		name +
		// 		'", "' +
		// 		surname +
		// 		'", "' +
		// 		img +
		// 		'", "' +
		// 		email +
		// 		'","' +
		// 		phone +
		// 		'", "' +
		// 		login +
		// 		'", "' +
		// 		password +
		// 		'", "' +
		// 		role +
		// 		'")'

		// 	connect.query(sql, (err, result) => {
		// Добавляем сообщение, при успешном взаимодействии с БД
		// 		result.message = 'Пользовател успешно добавлен'
		// 		err ? res.send(err) : res.send(JSON.stringify(result))
		// 	})
	})
	/**
	 * Вспомогательный маршрут для редактирования юзера:
	 * Автор: Румянцев Александр
	 * Описание: Выводить форму на интейфейс для добавления пользователя
	 * Версия: v1
	 * Метод: GET
	 * Пример работы с запросом:
	 * Ввести в адресную строку - http://localhost:3000/form_edit_user
	 */

	app.get('/form_edit_user', function (req, res) {
		res.send(
			`
                <h1>
                    Тестовая форма для редактирования юзера - edit_user
                </h1>
                <form enctype="multipart/form-data" action='/users/edit_user' method='post'>
										<input placeholder="ID" type="text" name="ID"/>
                    <input placeholder="NAME" type="text" name="NAME"/>
                    <input placeholder="SURNAME" type="text" name="SURNAME"/>
                    <input placeholder="IMG" type="text" name="IMG"/>
                    <input placeholder="EMAIL" type="text" name="EMAIL"/>
                    <input placeholder="PHONE" type="text" name="PHONE"/>
                    <input placeholder="LOGIN" type="text" name="LOGIN"/>
                    <input placeholder="PASSWORD" type="text" name="PASSWORD"/>
                    <input placeholder="ROLE" type="text" name="ROLE"/>
                    <input type='submit' value="Добавить"/>
                </form>
            `
		)
	})
}
