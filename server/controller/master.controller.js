const {Master} =require('../models/models')
const ApiError=require('../exeptions/api-error')

class MasterController {
    async createMaster(req, res, next) {
        const {name, email}=req.body
        const newMaster = await Master.create({name, email})
        return res.json(newMaster)
    }

    async getAllMasters(req, res) {
        const masters = await db.query(`SELECT * FROM master`)
        res.json(masters.rows)
    }

    async getOneMaster(req, res) {
        const id = req.params.id
        const master =await db.query(`SELECT * FROM master where id = $1`,[id])
        res.json(master.rows)
    }
    async updateMaster(req, res) {
        const {id, name, email} = req.body
        const master = await db.query('UPDATE master set name = $1, email = $2 where id = $3 RETURNING *',
            [name, email, id]
        )
        res.json (master.rows[0])
    }
    async deleteMaster(req, res){
        const id = req.params.id
        const master =await db.query(`DELETE FROM master where id = $1`,[id])
        res.json(master.rows)
    }
}

module.exports = new MasterController()