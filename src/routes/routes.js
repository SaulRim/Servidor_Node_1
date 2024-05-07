import {Router} from 'express';
import data from './dataTemp.js';

const route = Router(); 
let mobs = data.mobs;
const category = data.category;

// Pagina principal
route.get('/',(req,res) =>{
    try {
        // Pagina de inicio
        res.render("index");
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
    
});

// Pagina de documentacion
route.get('/documentation',(req,res) =>{
    try {
        res.render("documentation");
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

// Pagina de datos
route.get('/about',(req,res) =>{
    try {
        res.render("about");
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});


// Peticiones GET
// Get: /mobs
route.get('/mobs', (req,res) =>{ // toda la lista de mobs
    try {
        res.send(mobs);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
// Get: /mobs/category
route.get('/mobs/category',(req,res) =>{ // lista de categorias
    try {
        res.send(category);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

// Get: /mobs/:id
route.get('/mobs/:id',(req,res) =>{ // mobs individuales
    try {
        const id = Number(req.params.id);
        const element = mobs.find((mob) => mob.id == id);
        res.json(element);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

// Get: /mobs/category/categoriaId
route.get('/mobs/category/:categoria',(req,res) =>{ // todos los mobs de una categoria
    try {
        const name = req.params.categoria;
        const element = mobs.filter((mob) => mob.category === name)
        res.send(element);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});


// Peticiones POST
// POST: /mobs
route.post('/mobs',(req,res) =>{
    try {
        let obj = {
            id: mobs.length+1,
            name: req.body.name,
            health: req.body.health,
            category: req.body.category
        }
        // Comprobacion de campos
        mobs.push(obj);
        res.json(obj);

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


// Peticiones PUT
// /mobs/id
route.put('/mobs/:id',(req,res) =>{
    try {
        const bandera = mobs.find(mob => mob.id === Number(req.params.id));
        if(bandera){
            mobs = mobs.map(element => element.id === Number(req.params.id) ? {...element,...req.body}: element);
            res.json({
                status: 200,
                message: "Actualizado elemento: " + req.params.id
            });
        } else{
            res.status(404).json({
                status: 404,
                message: "Id inexistente: " + req.params.id
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});



// Peticiones Delete
// Delete: /mobs/id
route.delete('/mobs/:id',(req,res) =>{ 
    try {
        if(mobs.length === 0){
            return res.status(404).json({
                status: 404,
                message: "Sin datos"
            });
        }
        const bandera = mobs.find(mob => mob.id === Number(req.params.id));
        if(bandera){
            mobs = mobs.filter(element => element.id !== Number(req.params.id));
            res.status(204).send();
        } else{
            res.status(404).json({
                status: 404,
                message: "Id inexistente: " + req.params.id
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

// Imagenes registradas
route.get('/img',(req,res) =>{
    res.send('../public/img/cafe.png');
});
export default route; // Exportarlas para utilizarlas en otra clase.