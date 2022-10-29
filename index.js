//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

//Импортируем плагины
const express = require("express");

const mysql = require("mysql")
//Подключение к базе данных
// 1- создадим функцию-конфигурацию для подключения
function config () {
    return {
        host: "94.228.126.172",
        port: 3306,
        user: "inordic_sch_usr",
        password: "VANCfzNsov9GDt1M",
        database: "inordic_school",
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    }
}

// 2- создадим подключение
const connect = mysql.createPool(config())



// Инициализируем приложение express
const app = express();

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
app.get(
    '/',
    function(request, response){
        //Посылаем ответ от сервера
        ///console.log(request.query.test)
        //Декомпозиция объекта
        const {test, name} = request.query
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
    }
)

//маршрут для проверки подключения к базе данных
app.get(
    `/connect`,
    function (request, response){

        console.log(mysql);

        response.send(
            'тестируем подключение к БД'
        )
    }
)




/**
 * Маршрут для получения всех товаров:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON со спском всех товаров
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_all_good
 */
app.get('/get_all_good', function(request, response){

    // Составим запрос для БД
    // SELECT - выборка (получить), ключевое слово
    // * - обозначение всех полей в БД
    // FROM - ключевое слово, означает откуда
    // goods - название таблицы в БД
    const sql = 'SELECT * FROM goods'

    // Отправить запрос на сервер
    // Для отправки запроса используем функцию query, передаем первым параметром запрос, а вторым callback
    connect.query(
        sql,
        (error, result) => {
            if(error){
                // Выводим ошибку
                response.send(
                    error
                )
                // Если ошибок нет
            }else{
                // Отправляем результат запроса на экран
                response.send(
                    // Предварительно через метод JSON.stringify преобразуем объект в строку JSON
                    JSON.stringify(result)
                )
            }
        }
    )
})

/**
 * Маршрут для получения одного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с одним товаром
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_item?id=1
 */

app.get ('/get_item', function (req, res) {
    // Получаем поле id bз объекта request
    const {id} = req.query
    console.log(id)
    // Сформировать новый запрос на получение одного товара
    // Запрос отличается от предыдущего только конструкцием WHERE ID = id
    // Где WHERE дословно переводится как слово - ГДЕ
    // Далее идет условие, поле в БД ID = id(переменная, полученная выше)
    const sql = `SELECT * FROM goods WHERE ID=${id}`
    // Отправляем запрос
    connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify(result))
        }
    )
})



/**
 * Маршрут для удаления одного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями которые описывают успешное удаление товара из БД
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/del_item?id=1
 */

app.get ('/del_item', function (req, res){
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



/**
 * Маршрут для добавления одного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями которые описывают успешное добавление товара из БД
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 */

app.post ('/add_item', function (req, res){
    // тут не можем читать данные с формы без дополнительных плагинов
    res.send('заглушка для добавления товаров')
})



/**
 * Вспомогательный маршрут для редактирования одного товара:
 * Автор: Румянцев Александр
 * Описание: Выводить форму на редактирования для добавления товара
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/
 */

app.post ('/form_edit_item', function(req, res){
    res.send(
        `
                <h1>
                    Тестовая форма для маршрута - add_item
                </h1>
                <form action='/add_item' method='post'>
                    <input type="text" name="ID"/>
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
                <form action='/add_item' method='post'>
                    <input type="text" name="ID"/>
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

//Начинаем прослушивать определенный порт
app.listen(3000);