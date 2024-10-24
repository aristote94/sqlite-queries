const express = require("express")
const carsRouter = express.Router()
const db = require("../database")

carsRouter.get("/test", (req, res) => {
	res.json({
		msg: "cars route test ok !!",
	})
})

// GET return a list of all cars
carsRouter.get("/", (req, res) => {
	db.all("SELECT * FROM cars", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(rows)
		}
	})
	 
})
carsRouter.get("/:id", (req, res) => {
	
	const { id } = req.params // obtenir l'id à partir des paramètres
	db.get("SELECT * FROM cars WHERE id = ?", [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(row)
		}
	})
	 
})

// POST add a new car
carsRouter.post("/", (req, res) => {
	const { carName, carYear, carImg } = req.body
	console.log(`Inserting car: ${carName}, ${carYear}, ${carImg}`);
	db.run(
		"INSERT INTO cars (carName, carYear, carimage) VALUES (?, ?, ?)",
		[carName, carYear, carImg],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else {
				res.json({ id: this.lastID })
			}
		}
	)
})


// PUT update a car based on the param id
carsRouter.put("/:id", (req, res) => {
	const { id } = req.params
	const { carName, carYear, carImg } = req.body
	res.json({
		msg: "update a car based on its id ... ",
	})
	db.run(
        "UPDATE cars SET carName = ?, carYear = ?, carimage = ? WHERE id = ?",
        [carName, carYear, carImg, id],
        function (err) {
            if (err) {
                console.error(`Database error: ${err.message}`);
                res.status(500).json({ error: err.message });
            } else {
                console.log(`Car updated with ID: ${id}, changes: ${this.changes}`);
                res.json({ changes: this.changes });
            }
        }
    );
})

// DELETE delete a car based on the param id
carsRouter.delete("/:id", (req, res) => {
	const { id } = req.params
	db.run("DELETE FROM cars WHERE id = ?", [id], function (err) {
	if (err) {
		res.status(500).json({ error: err.message })
	} else {
		res.json({ changes: this.changes })
	}
})
})

// GET one car based on its id
carsRouter.get("/:id", (req, res) => {
	res.json({
		msg: "update a car based on its id ... ",
	})
})

module.exports = carsRouter
