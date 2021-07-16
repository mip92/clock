const db = require('../db')

class MasterController {
    async createMaster(req, res) {
        const {name, email} = req.body
        console.log(name, email)
        const newMaster = await db.query(`INSERT INTO master (name, email) values ($1, $2) RETURNING *`, [name, email])
        res.json(newMaster.rows[0])
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