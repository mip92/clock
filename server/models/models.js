const sequelize =require('../db')
const {DataTypes}=require('sequelize')

const Master= sequelize.define('master',{
id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull: false},
    email:{type:DataTypes.STRING, unique: true, allowNull: false},
   // city:{type:DataTypes.STRING, allowNull: false},
    rating:{type:DataTypes.INTEGER, allowNull: false, defaultValue: 5},
})
const City= sequelize.define('city',{
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    city_name:{type:DataTypes.STRING, unique: true, allowNull: false},
})
const Rating=sequelize.define('rating',{
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate:{type:DataTypes.INTEGER, unique: true, allowNull: false},
})
const MasterCity = sequelize.define('master_city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    masterId:{
        type: DataTypes.INTEGER,
        references:{
            model: Master,
            key:'id'
        }
    },
    cityId:{
        type: DataTypes.INTEGER,
        references:{
            model: City,
            key:'id'
        }
    }
})

Master.belongsToMany(City, {through: MasterCity })
City.belongsToMany(Master, {through: MasterCity })

Master.hasMany(Rating)
Rating.belongsTo(Master)

module.exports={
    Master, City, Rating, MasterCity
}