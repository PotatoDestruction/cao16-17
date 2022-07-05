const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { port, dbConfig } = require("./config");
const Joi = require("joi");

const carSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string(),
    price: Joi.number().required(),
    numberplates: Joi.string().required()

})

const app = express();

app.use(cors());
app.use(express.json());

app.get("/cars", async (req,res) => {
    try{
    const con = await mysql.createConnection(dbConfig);

    const [getCars] = await con.query('SELECT * FROM cars');

    con.end()
    res.send(getCars)
    }catch(err) {
        res.status(500).send(err)
    }
});

app.get("/cars/:carId", async (req,res) => {
    try {
    const con = await mysql.createConnection(dbConfig);
    const carId = req.params.carId;
    
    const [car] = await con.query("SELECT * FROM cars WHERE id = ?", [carId]);
        if(car.length == 0){
            res.send(`This car ID:${carId} does not exist.`)
            return;
        }
    con.end();
    res.send(car);

    }catch (err) {
        res.status(500).send(err);
    }
});

app.post("/cars", async (req,res) => {
    let cars

    try{
        cars = await carSchema.validateAsync(req.body)
    }catch(err){
        res.status(400).send(err.details[0].message)
        console.log(err.details[0].message)
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
    
        const [ postCar ] = await con.query("INSERT INTO cars SET ?", [cars]);
            con.end()
            res.send(postCar)
        }catch (err) {
            res.status(500).send(err);
          console.log(2)
        }
})

app.delete('/cars/:carId', async (req,res) => {
    try {
    const con = await mysql.createConnection(dbConfig);
    const carId = req.params.carId
    
    const [deleteCar] = await con.query('DELETE FROM cars WHERE id = ?', [carId]);
        
    if(deleteCar.affectedRows == 0){
        res.send(`This car ID:${carId} does not exist.`)
        return;
    }

    con.end();
    res.send(deleteCar);
    } catch(err) {
        console.log("aasd")
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`Online: ${port}`)
});