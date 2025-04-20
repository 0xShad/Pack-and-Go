"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config/config");
const db_1 = __importDefault(require("./database/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const tour_routes_1 = __importDefault(require("./routes/tour.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/auth', auth_routes_1.default);
app.use('/tour', tour_routes_1.default);
// global error middleware
app.use(middleware_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Pack & Go API');
});
app.listen(config_1.PORT, () => {
    console.log(`Server is running on PORT: 8080`);
    (0, db_1.default)();
});
