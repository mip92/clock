const {Master, MasterCity, City} = require('../models/models')
const ApiError = require('../exeptions/api-error')
const {CityController} = require('./city.controller')

class MasterController {
    async createMaster(req, res, next) {
        try {
            const {name, email, city_id} = req.body
            const newMaster = await Master.create({name, email});
            await MasterCity.create({masterId: newMaster.id, cityId: city_id})
            return res.json(newMaster)
        } catch (e) {
            console.log(e)
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async getAllMasters(req, res) {
        let {limit, page, city_id} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let masters
        if (!city_id) masters = await Master.findAndCountAll({
            include: {model: City, required: true},
            limit,
            offset
        })
        if (city_id) masters = await Master.findAndCountAll({
            include: [{
                where: {id: city_id},
                model: City,
                required: true
            }],
            limit,
            offset
        })

        res.json(masters)
    }

    async getOneMaster(req, res) {
        const id = req.params.id
        const master = await Master.findOne({
            include: { all: true},
                where: {id},

                //include: {model: City, required: true,}
            }
        )
        console.log(master)
        res.json(master)
    }

    async updateMaster(req, res) {
        const {id, name, email, city_id} = req.body
        const master = await Master.findByPk(id)
        await master.update({
            include: [{
                model: City,
                required: true
            }],
            where: {id}
        })
        console.log(master)
        /*const master = await db.query('UPDATE master set name = $1, email = $2 where id = $3 RETURNING *',
            [name, email, id]
        )*/
        res.json(master.rows[0])
    }

    async deleteMaster(req, res) {
        const id = req.params.id
        const master = await db.query(`DELETE
                                       FROM master
                                       where id = $1`, [id])
        res.json(master.rows)
    }
}

module.exports = new MasterController()