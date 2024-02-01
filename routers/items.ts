import {Router} from 'express';
import {ItemWithoutId} from "../types";
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

itemsRouter.delete('/:id', async (req, res)=>{
    const {locations, categories,items} = await fileDb.getItems();
    const item_id = req.params.id;

    const idToDelete = items.findIndex(item => item.id === item_id);

    if (idToDelete !== -1) {
        const itemToDelete = items[idToDelete];

        const isMatchingCategory = categories.some(category => itemToDelete.category_id === category.id);
        const isMatchingLocation = locations.some(location => itemToDelete.location_id === location.id);

        if (isMatchingCategory || isMatchingLocation) {
            res.status(400).send('Cannot delete item because category_id and/or location_id are blinding');
        } else {
            items.splice(idToDelete, 1);
            await fileDb.save();
            res.send(items);
        }
    } else {
        res.status(404).send('Item not found');
    }
});

itemsRouter.post('/', imagesUpload.single('image'),async(req, res)=>{

    const item: ItemWithoutId = {
        category_id: req.body.category_id,
        location_id: req.body.location_id,
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    const newItem = await fileDb.addItem(item);
    res.send(newItem);
});

export default itemsRouter;