import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
import express from "express";
import { buildSchema } from "type-graphql";
import mikroORMConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/post";
import path from "path";

config({ path: path.join(__dirname + "/.env") });

console.info(path.join(__dirname + "/.env"), process.env.PORT);

const __init__ = async () => {
    const orm = await MikroORM.init(mikroORMConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }),
    });
    await apolloServer.start()
    apolloServer.applyMiddleware({ app });

    app.get("/", (req, res) => {
        return res.send("hello");
    });
    app.listen(5000, () => {
        console.info("Server Started at ", 5000);
    });
};

__init__();
