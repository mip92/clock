const ApiError = require('../exeptions/api-error')
const {City} = require('../models/models')

class CityController {
    async createCity(req, res, next) {
        try {
            const {city} = req.body
            const newCity = await City.create({city_name: city})
            res.status(200).json(newCity)
        }catch(e){
            next(ApiError.BadRequest(e.parent.detail))
            console.log(e.parent.detail)
        }
    }

    async getCities(req, res) {
        const cities = await City.findAll()
        res.status(200).json(cities)
    }

    async getOneCity(req, res) {
        const id = req.params.id
        console.log(id)
        const city = await db.query(`SELECT *
                                     FROM city
                                     where id = $1`, [id])
        res.status(200).json(city.rows)
    }
}

module.exports = new CityController()