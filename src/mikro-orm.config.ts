import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts} ",
    
    },
    dbName: "talkative",
    type: "postgresql",
    user: "th3h04x",
    password: "test123",
    entities: [Post],
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
