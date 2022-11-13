const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app, connect) => {
	app.get('/users/get', function (req, res) {
		console.log('WorkerTableUsers')
		// Создадим экземпляр вспомогательного класса
		const workerTableUser = new WorkerTableUser(res, req)
		workerTableUser.getAll()
	})
}
