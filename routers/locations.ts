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
locationsRouter.delete('/:id', async (req, res)=>{
    const {locations} = await fileDb.getItems();
    const location_id = req.params.id;
    const idToDelete = locations.findIndex(location => location.id === location_id);
    if (idToDelete !== -1) {
        locations.splice(idToDelete,1);
        await fileDb.save();
        res.send(locations);
    } else {
        res.status(404).send('Location not found');
    }
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