const userController = require("../controllers/user.controller");

module.exports = (app) => {
    app.post("/api/user/register", userController.register);
    app.post("/api/user/login", userController.login);
    app.post("/api/user/logout", userController.logout);
};
