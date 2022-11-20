const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({ dest: 'uploads/' })
// устанавливаем название файла в форме
const fileFromForm = uploadFromForm.single('MYFILE')
//Импортируем плагин
const nodemailer = require('nodemailer')
/**
 * Маршрут для отправки сообщения администратору интернет-магазина:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с результатом работы отправки письма
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 */

module.exports = app => {
	app.post('/mail/send', fileFromForm, function (req, res) {
		//Сообщение которое мы передали с формы
		const messageToManager = req.body.TEXT
		//Создали объект через функцию createTransport который содержит настройки
		let transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru', //Хостинг почты яндекса
			port: 465, //порты почты
			secure: 465, //эта конфигурация откроет соединение с сервером TLS с самозаверяющим или недействительным
			auth: {
				user: 'inordic2022',
				pass: 'inordic',
			},
		})
		//Создадим объект с опциями для письма
		let mailOptions = {
			from: '"inordic" <inordic2022@yandex.ru>', //sender message
			to: 'f1shka@bk.ru', //тут указываем адрес менеджера
			subject: 'Письмо от магазина InordicShop', //subject line
			html: messageToManager, // html body
		}
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.send(error)
			}
			res.send(
				'Ваше сообщение успешно отправлено',
				info.messageId,
				info.response
			)
		})
	})

	/**
	 * Вспомогательный маршрут с формой для отправки сообщения администратору интернет-магазина:
	 * Автор: Румянцев Александр
	 * Описание: Возвращает HTML форму
	 * Версия: v1
	 * Метод: GET
	 * Пример работы с запросом:
	 * Ввести в адресную строку - http://localhost:3000/mail/form
	 */

	app.get('/mail/form', function (req, res) {
		res.send(
			`
                <h1>
                    Тестовая форма для маршрута - mail/send
                </h1>
                <form enctype="multipart/form-data" action='/mail/send' method='post'>
                    <input placeholder="TEXT" type="text" name="TEXT"/>
                    <input value='Отправить письмо' type="submit"/>
                </form>
            `
		)
	})
}
