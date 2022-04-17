"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    allowGlobalContext: true,
    dbName: "talkative",
    user: "th3h04x",
    password: "test123",
    debug: !constants_1.__prod__,
    type: "postgresql",
    migrations: {
        disableForeignKeys: false,
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post_1.Post, User_1.User],
};
//# sourceMappingURL=mikro-orm.config.js.map