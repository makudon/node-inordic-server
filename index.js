//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

//Импортируем плагины
const { json } = require('express')
const express = require('express')

const mysql = require('mysql')
const WorkerDataBase = require('./services/worker-data-base')
//Подключение к базе данных
// 1- создадим функцию-конфигурацию для подключения
function config() {
	return {
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
}

// 2- создадим подключение
const connect = mysql.createPool(config())

// Инициализируем приложение express
const app = express()

//описание класса
class FirstClassAero {
	name = 'самолет из королевской авиации'
	static staticProperty = 'статический атрибут класса'
	goFly() {
		console.log('задействован метод test из класса FirstClass')
		console.log('самолет полетел')
		console.log(this.name)
	}
	constructor(param) {
		console.log('объект создался')
		console.log('параметр в конструкторе' + param)
		this.goFly()
	}
}

//использовакин класса
// 1 - создать объект класса
//К статическому атрибуту можно обращаться без создания объекта
console.log('cтатический атрибут:', FirstClassAero.staticProperty)
const myAero =
	new FirstClassAero('hello OOP') / //Ключевое слово super, нужно обязательно, для того чтобы получить от родителя методы и атрибуты
	// результат работы класса FirstClassAero
	// объект MyAero c полями goFly
	// 2 - задействуем метод пoFly из класса FirstCLACCAERO

	/**
	 * План для построения интернет магазина (что нужно добавить)
	 *
	 * Базовые запросы для интерфейса магазина:
	 * - Получение данных пользователя по его логину и паролю (использовать POST  запрос)
	 * - Получение данных о всех товарах (использовать GET запрос)
	 * - Получение данных об одном товаре (Использовать GET запрос)
	 * Базовые запросы для интерфейса админки магазина:
	 * - Удаление товара
	 * - Добавление товара
	 * - Редактирование товара
	 * - Выводить список пользователей
	 * - Удалять пользователя
	 * - Редактировать пользователя
	 * Дополнительно таблица истории купленных товаров
	 * - Выводить историю
	 *
	 * Сделать формы на безовом маршруте, для теста пост запросов
	 *
	 * ДЗ 28 урок
	 * Прописать все базовые (указанные выше) маршруты
	 */

	// 1- корневой маршрут
	//Первый базовый маршрут приложения
	app.get('/', function (request, response) {
		//Посылаем ответ от сервера
		///console.log(request.query.test)
		//Декомпозиция объекта
		const { test, name } = request.query
		response.send(
			`
                <h1>
                    Корневой маршрут
                </h1>
                <ul>
                    <li>
                        <a href="/get_all_good"> 
                            2 - Получения все товаров
                        </a>
                    </li>
                    <li>
                        <a href="/get_item?id=1">
                            3 - Получение одного товара
                        </a>
                    </li>
                    <li>
                        <a href="/del_item?id=1">
                            4 - Удаление товара
                        </a>
                    </li>
                    <li>
                        <a href="/form_add_item">
                            5 - Добавление товара
                        </a>
                    </li>
                    <li>
                        <a href="/form_edit_item">
                            6 - Редактирование товара
                        </a>
                    </li>
                </ul>       
            `
		)
	})

// Распределяем роутеры по файлам

//Роуты для товаров
require('./routes/good/get-all-good')(app, connect)
require('./routes/good/get-item')(app, connect)
require('./routes/good/del-item')(app, connect)
require('./routes/good/add-item')(app, connect)
require('./routes/good/add-item')(app, connect)
require('./routes/good/edit-item')(app, connect)

//Роуты для пользователей
require('./routes/user/add-user')(app, connect)
require('./routes/user/get-all-users')(app, connect)
require('./routes/user/get-user')(app)
require('./routes/user/edit-user')(app)

//Начинаем прослушивать определенный порт
app.listen(3000)

// ДЗ
// Реализовать в сервисе WorkerDataBase, удаление пользователя из БД и применить используя роут, воркер
// Для удаления конкретного юзера
