import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Category, CategoryWithoutId, Item, ItemWithoutId, Location, LocationWithoutId} from "./types";
const fileName = './db.json';
let dataCategory: Category[] = [];
let dataLocation: Location[] = [];
let dataItem: Item[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            const parsedData = JSON.parse(fileContents.toString());

            if(parsedData.categories) {
                dataCategory = parsedData.categories;
            } else {
                dataCategory = [];
            }

            if(parsedData.locations) {
                dataLocation = parsedData.locations;
            } else {
                dataLocation = [];
            }

            if(parsedData.items) {
                dataItem = parsedData.items;
            } else {
                dataItem = [];
            }
        } catch (e) {
            dataCategory = [];
            dataLocation = [];
            dataItem = [];
        }
    },
    async getItems() {
        const dataToGet = {
            categories: dataCategory,
            locations: dataLocation,
            items: dataItem,
        }
        return dataToGet;
    },
    async addItem(file: ItemWithoutId) {
        const id = crypto.randomUUID();
        const response = {id, ...file};
        dataItem.push(response);
        await this.save();

        return response;
    },
    async addLocation(file: LocationWithoutId) {
        const id = crypto.randomUUID();
        const responseLocation = {id, ...file};

        dataLocation.push(responseLocation);
        await this.save();

        return responseLocation;
    },
    async addCategory(file: CategoryWithoutId) {
        const id = crypto.randomUUID();
        const response = {id, ...file};
        dataCategory.push(response);
        await this.save();

        return response;
    },
    async save() {
        const dataToSave = {
            categories: dataCategory,
            locations: dataLocation,
            items: dataItem,
        }
        return fs.writeFile(fileName, JSON.stringify(dataToSave));
    }
};

export default fileDb;