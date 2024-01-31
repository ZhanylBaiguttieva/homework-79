import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Category, CategoryWithoutId, Location, LocationWithoutId} from "./types";
const fileName = './db.json';
let data: Category[] = [];
let dataLocation: Location[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            const parsedData = JSON.parse(fileContents.toString());

            if(parsedData.categories) {
                data = parsedData.categories;
            } else {
                data = [];
            }

            if(parsedData.locations) {
                dataLocation = parsedData.locations;
            } else {
                dataLocation = [];
            }
        } catch (e) {
            data = [];
            dataLocation = [];
        }
    },
    async getItems() {
        const dataToGet = {
            categories: data,
            locations: dataLocation,
        }
        return dataToGet;
    },
    async addItem(file: CategoryWithoutId) {
        const id = crypto.randomUUID();
        const response = {id, ...file};
        data.push(response);
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
    async save() {
        const dataToSave = {
            categories: data,
            locations: dataLocation,
        }
        return fs.writeFile(fileName, JSON.stringify(dataToSave));
    }
};

export default fileDb;