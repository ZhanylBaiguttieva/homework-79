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

categoriesRouter.post('/', async(req, res)=>{

    const category: CategoryWithoutId = {
        title: req.body.title,
        description: req.body.description,
    };

    const newCategory = await fileDb.addItem(category);
    res.send(newCategory);
});

export default categoriesRouter;