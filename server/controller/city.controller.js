const db = require('../db')

class CityController {
    async createCity(req, res) {
        const {city} = req.body
        const newCity = await db.query(`INSERT INTO city (city_name) values ($1) RETURNING *`, [city])
        res.json(newCity.rows[0])
    }

    async getCities(req, res) {
        const cities = await db.query(`SELECT * FROM city`)
        res.json(cities.rows)
    }

    async getOneCity(req, res) {
        const id = req.params.id
        console.log(id)
        const city =await db.query(`SELECT * FROM city where id = $1`,[id])
        res.json(city.rows)
    }
}

module.exports = new CityController()