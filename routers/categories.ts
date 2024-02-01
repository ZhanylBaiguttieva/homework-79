import {Router} from 'express';
import {CategoryWithoutId} from "../types";
import fileDb from "../fileDb";
const categoriesRouter = Router();
categoriesRouter.get('/', async (req, res)=>{
    try {
        const {categories} = await fileDb.getItems();
        res.send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoriesRouter.get('/:id', async (req, res)=>{
    const {categories} = await fileDb.getItems();
    const category  = categories.find(p => p.id === req.params.id);
    res.send(category);
});

categoriesRouter.delete('/:id', async (req, res)=>{
    const {categories} = await fileDb.getItems();
    const category_id = req.params.id;
    const idToDelete = categories.findIndex(category => category.id === category_id);
    if (idToDelete !== -1) {
        categories.splice(idToDelete,1);
        await fileDb.save();
        res.send(categories);
    } else {
        res.status(404).send('Category not found');
    }
});

categoriesRouter.post('/', async(req, res)=>{

    const category: CategoryWithoutId = {
        title: req.body.title,
        description: req.body.description,
    };

    const newCategory = await fileDb.addCategory(category);
    res.send(newCategory);
});

export default categoriesRouter;