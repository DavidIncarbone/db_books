import connection from "../connection.js";

function index(req, res) {
    const sql = "SELECT * FROM `reviews`";

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: "Database query failed"
        })
        console.log(results)
        let item = results;
        const response = {
            totalCount: results.length,
            item
        };
        res.json(response);
    })
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = "SELECT * FROM `books` WHERE `id` = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: "Database query failed"
        })
        const item = results[0];
        if (!item) {
            return res.status(404).json({
                error: "L'elemento non esiste"
            })
        }
        res.json({ success: true, item });
    })
}

function store(req, res) {
    let newId = 0;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id > newId) {
            newId = books[i].id;
        }
    }
    newId += 1;
    console.log(req.body);


    if (!req.body.published) {
        throw new CustomError("Pubblica non cliccato", 500);
    }

    if (!req.body.title || !req.body.content || !req.body.image || !req.body.category) {
        throw new CustomError("Uno dei campi risulta vuoto", 500);
    }
    const newItem = {
        id: newId,
        ...req.body,
    };

    books.push(newItem);
    res.status(201).json(newItem);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const item = books.find((item) => item.id === id);
    if (!item) {
        throw new CustomError("L'elemento non esiste", 404);
    }

    for (key in item) {
        if (key !== "id") {
            item[key] = req.body[key];
        }
    }

    res.json(item);
}
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `reviews` WHERE `id` = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: "Database query failed"
        })
        res.sendStatus(204)


    })
}

export { index, show, store, update, destroy }