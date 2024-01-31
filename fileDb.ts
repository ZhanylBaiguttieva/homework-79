import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Category, CategoryWithoutId} from "./types";
const fileName = './db.json';
let data: Category[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: CategoryWithoutId) {
        const id = crypto.randomUUID();
        const response = {id, ...item};
        data.push(response);
        await this.save();

        return response;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;