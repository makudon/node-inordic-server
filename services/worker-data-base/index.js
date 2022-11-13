// В node можно экспортировать ИСКЛЮЧИТЕЛЬНО через конструкцию
// module.exports = (можно экспортировать классф, переменные, функции и тд)
// Абстрактный класс для работы с таблицами в БД

const mysql = require('mysql')

module.exports = class WorkerDataBase {
	response
	request
	name_table
	// Закрыли атрибут config приватным уровнем доступа, для невозможности его изменения
	#config = {
		host: '94.228.126.172',
		port: 3306,
		user: 'inordic_sch_usr',
		password: 'VANCfzNsov9GDt1M',
		database: 'inordic_school',
		connectionLimit: 1000,
		connectTimeout: 60 * 60 * 1000,
		acquireTimeout: 60 * 60 * 1000,
		timeout: 60 * 60 * 1000,
	}
	getConnect() {
		return mysql.createPool(this.#config)
	}
	getAll() {
		// Абстрактный запрос к базе банных
		const sql = `SELECT * FROM ${this.name_table}`
		this.getConnect().query(sql, (error, result) => {
			if (error) {
				// Выводим ошибку
				this.response.send(error)
				// Если ошибок нет
			} else {
				// Отправляем результат запроса на экран
				this.response.send(
					// Предварительно через метод JSON.stringify преобразуем объект в строку JSON
					JSON.stringify(result)
				)
			}
		})
	}
	get(id) {
		// Абстрактный запрос к базе банных
		const sql = `SELECT * FROM ${this.name_table} WHERE ID = '${id}'`
		this.getConnect().query(sql, (error, result) => {
			if (error) {
				// Выводим ошибку
				this.response.send(error)
				// Если ошибок нет
			} else {
				// Отправляем результат запроса на экран
				this.response.send(
					// Предварительно через метод JSON.stringify преобразуем объект в строку JSON
					JSON.stringify(result)
				)
			}
		})
	}
	add(data) {
		let sql = `INSERT INTO '${this.name_table}'`
		//Сгенерировать запрос для добавления товара в БД
		// INSERT - добавление в БД
		// const sql =
		// 	'INSERT INTO `users`(`ID`, `NAME`, `SURNAME`, `IMG`, `EMAIL`, `PHONE`, `LOGIN`, `PASSWORD`, `ROLE`) ' +
		// 	'VALUES("' +
		// 	id +
		// 	'", "' +
		// 	name +
		// 	'", "' +
		// 	surname +
		// 	'", "' +
		// 	img +
		// 	'", "' +
		// 	email +
		// 	'","' +
		// 	phone +
		// 	'", "' +
		// 	login +
		// 	'", "' +
		// 	password +
		// 	'", "' +
		// 	role +
		// 	'")'
		for (const field in data) {
			console.log('Название поля:', field)
			console.log('Значение поля:', data[field])
		}
		sql += ''

		this.response.send(sql)
	}
}
