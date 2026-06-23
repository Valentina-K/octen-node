const express = require("express");
const {userService} = require("./services/user.service");
const app = express();
//конвертирует данные запроса из body, переданные в json-формате в объект
app.use(express.json());
//для чтения данных с формы в формате ключ:значение
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
    const data = await userService.getAll();
    res.json(data);
})

app.get("/users/:id", async (req, res) => {
    const data = await userService.getById(req.params.id);
    res.json(data);
})

app.post("/users", async(req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data);
})

app.put("/users/:id", async (req, res) => {
    const data = await userService.update(req.params.id, req.body);
    res.status(200).json(data);
})

app.delete("/users/:id", async (req, res) => {
    const data = await userService.delete(req.params.id);
    if (data === 1) res.end();
    else res.status(404).end();

})

app.listen(3000, () => {
    console.log('listening on port 3000');
})