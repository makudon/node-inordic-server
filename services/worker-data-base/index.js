// В node можно экспортировать ИСКЛЮЧИТЕЛЬНО через конструкцию
// module.exports = (можно экспортировать классф, переменные, функции и тд)
// Абстрактный класс для работы с таблицами в БД
//
//
//Список атрибутов:
//name_table - название таблицы с которой будет работать реализация
//
//
//Список методов:
//getConnect - устанавливаем соединение с базой данных и обязательно возвращаем его
//
//getAll - обращается к таблице и возвращает из нее ве поля и все строки
//
//get - обращается в таблице и возвращает определенный элемент(строку) из таблицы, работает за счет параметра id, который мы передаем из вне
//
//query - отправка запроса на сервер
//
//update - обновление (тема 434 урока)
//
//del - удаление (ДЗ) - ориентируемся на метод get

const mysql = require('mysql')

module.exports = class WorkerDataBase {
	//делаем пустые атрибуты которые будем устанавливать в каждой реализации
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

	query(sql) {
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

	getConnect() {
		return mysql.createPool(this.#config)
	}
	getAll() {
		// Абстрактный запрос к базе банных
		const sql = `SELECT * FROM ${this.name_table}`
		this.query(sql)
	}
	get(id) {
		// Абстрактный запрос к базе банных
		const sql = `SELECT * FROM ${this.name_table} WHERE ID = '${id}'`
		this.query(sql)
	}
	add(data) {
		let sql = `INSERT INTO ${this.name_table}`
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
		//с помощью одного цикла собрать 2 части запроса
		//проинициализируем 2 переменных которые будут содержать 2 части запроса
		//(IDNAMESURNAMEEMAILIMGPHONELOGINPASSWORDROLE)
		let partFields = '('
		let partValue = '('
		// количество полей внутри даты
		// первый шагом получаем вее ключи из объекта, object keys вернет масси с ключами полей и дальше можно обратиться к длине этого массива
		const keysForData = Object.keys(data)
		// второй шаг - получаем длину массива ключей
		const length = keysForData.length
		//в цикле наша задача собрать через конкатенацию(склеивание строк) 2 части запроса
		let i = 0
		for (const field in data) {
			console.log('Название поля:', field)
			console.log('Значение поля:', data[field])
			partFields += '`' + field + '`'
			partValue += "'" + data[field] + "'"
			//если на текущей итерации, элемент массива последний, тогда мы не добавляем запятую, если наоборот то добавляем
			//если элемент последний, в конце не нужно добавлять запятую и пробел
			if (length - 1 !== i) {
				partFields += `, `
				partValue += `, `
			}
			//создаем счетчик итераций в for in
			i++
			console.log('length', length)
			console.log('счетчик итераций', i)
		}
		//после цикла нужно закрыть скобку
		partFields += ')'
		partValue += ')'

		//Дособираем шаблон
		sql += partFields + ' VALUES ' + partValue

		//отправляем запрос через метод query
		this.query(sql)
	}

	update(data) {
		//Делаем первую часть для UPDATE запроса
		let sql = `UPDATE ${this.name_table} SET `
		//Получить массив с ключами объекта
		let entries = Object.entries(data)
		//Получаем длину массива чтобы далее сгенерировать запрос автоматически
		let length = Object.entries(data).length
		//Водим счетчик для дальнейшего контроля генерации полей в цикле for of
		let count = 0
		//часть для запроса с запятой и пробелом добавляем эту часть когда элемент НЕ последний
		let coma = ', '
		//Цикл FOR OF, перебирает все поля и с помощью конкатенации собирается sql запрос
		for (let element of entries) {
			//Условие для того чтобы поле ID не добавлялось в запрос автоматически
			//Потому что ID уникален для строки и по нему мы обновляем данные в БД
			if (element[0] != 'ID') {
				//Формируем строку для запроса
				sql += '`' + element[0] + '`' + '=' + '"' + element[1] + '"'
				//Если не последний, добавляем запятую с пробелом
				if (length - 1 !== count) {
					sql += coma
				}
			}
			//Обновляем счетчик, чтобы поймать условие когда элемент последний и не поставить после него запятую
			count++
		}
		//Добавляем строку с условием по полю ID
		//Если ID будет передам, такой которого нету в БД то запрос сработает как INSERT
		sql += ` WHERE ID='${data.ID}'`
		//Отправляем SQL запрос
		this.query(sql)
	}
}
