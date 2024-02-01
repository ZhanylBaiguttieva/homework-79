import {Router} from 'express';
import {ItemWithoutId, LocationWithoutId} from "../types";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
const itemsRouter = Router();
itemsRouter.get('/', async (req, res)=>{
    try {
        const {items} = await fileDb.getItems();
        res.send(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

itemsRouter.get('/:id', async (req, res)=>{
    const {items} = await fileDb.getItems();
    const item = items.find(p => p.id === req.params.id);
    res.send(item);
});

itemsRouter.post('/', imagesUpload.single('image'),async(req, res)=>{

    const item: ItemWithoutId = {
        category_id: req.body.category_id,
        location_id: req.body.location_id,
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    const newItem = await fileDb.addLocation(item);
    res.send(newItem);
});

export default itemsRouter;