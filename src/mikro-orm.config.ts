import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";


export default {
    allowGlobalContext: true,
    dbName: "talkative",
    user: "th3h04x",
    password: "test123",
    debug: !__prod__,
    type: "postgresql",
    migrations:{
        disableForeignKeys: false,
        path: path.join(__dirname , './migrations'), // path to the folder with migrations
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: [Post],
    // entitiesTs: ['src/**/*.entity.ts'],
} as Parameters<typeof MikroORM.init>[0]