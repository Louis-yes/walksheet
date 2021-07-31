import eventFromList from './eventFromList.js';
import path from 'path';
import fs from "fs";
const list = fs.readFileSync(path.resolve(_dirname,"../data/list.txt"), 'utf8');
const project = eventFromList(list);
fs.writeFileSync("../data/initialProject.json", JSON.stringify(project));