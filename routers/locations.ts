import {Router} from 'express';
import {LocationWithoutId} from "../types";
import fileDb from "../fileDb";
const locationsRouter = Router();
locationsRouter.get('/', async (req, res)=>{
    try {
        const {locations} = await fileDb.getItems();
        res.send(locations);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

locationsRouter.get('/:id', async (req, res)=>{
    const {locations} = await fileDb.getItems();
    const location  = locations.find(p => p.id === req.params.id);
    res.send(location);
});

locationsRouter.post('/', async(req, res)=>{

    const location: LocationWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };

    const newLocation = await fileDb.addLocation(location);
    res.send(newLocation);
});

export default locationsRouter;