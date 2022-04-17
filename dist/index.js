"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const post_1 = require("./resolvers/post");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.join(__dirname + "/.env") });
console.info(path_1.default.join(__dirname + "/.env"), process.env.PORT);
const __init__ = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [post_1.PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.get("/", (req, res) => {
        return res.send("hello");
    });
    app.listen(5000, () => {
        console.info("Server Started at ", 5000);
    });
};
__init__();
//# sourceMappingURL=index.js.map