/*  Basic API implementation */
/* Use of Node.js and Express */ 
/* Use of GET, POST, DELETE and PUT methods */
/* Use of JSON format for data exchange */
/* José Manuel García Zumaya - A01784238*/
/* 27 - 04 - 2024 */

"use strict"
import express from "express";
const app = express();
app.use(express.json()) /* Middleware to parse JSON data */
let cards = [
    {
        "id": 1,
        "type": "atack",
        "name": "RadioJammer",
        "value": "6",
        "cost": 3
    }, 
    {
        "id": 2,
        "type": "defense",
        "name": "Shield",
        "value": "5",
        "cost": 2
    },
    {
        "id": 3,
        "type": "atack",
        "name": "Sword",
        "value": "7",
        "cost": 4
    },
    {
        "id": 4,
        "type": "atack",
        "name": "Axe",
        "value": "8",
        "cost": 5
    }
] /* Initial cards list */

function validateCard (card) { /* Function to validate the card structure */

    const expectedFields = {
        id: "number",
        type: "string",
        name: "string",
        value: "string",
        cost: "number"
    }

    for (let field in expectedFields) {
        console.log(field);
        if (card.hasOwnProperty(field) && typeof card[field] !== expectedFields[field]) {
            return false
        }
    }
   
    return true
} 
/* GET method to get all the cards */
app.get('/', (req, res) => {
    
    if (cards.length === 0 ){
        return res.status(200).send("There is no cards in the list");
    } 
        
    res.status(200).json(cards);
})
/* GET method to get a specific card by id */
app.get('/:id', (req, res) => {
    
    const id = Number(req.params.id);
    const card = cards.find(card => card.id == id);
    if (card  == undefined) {
        return res.status(200).send("Card not found");
    }
        
    res.status(200).json(card);
    
})
/* POST method to add a new card */
app.post('/', (req, res) => {

    const result = validateCard(req.body);
    
    if ( result ) {
        const card = req.body;
        cards.push(card);
        return res.status(200).send("Card added succefully");
    }
    res.status(200).send("Card NOT added due fails in syntaxis");
})
/* DELETE method to delete a card by id */
app.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const cardIndex = cards.findIndex(card => card.id == id);
    cards.splice(cardIndex, 1);
    
    if ( cardIndex == -1 ) {
        res.status(200).send("Card not found to delete");
    }
    
    res.status(200).send("Card deleted succefully");
    
})
/* PUT method to update a card by id */
app.put('/:id', (req, res) => {
    const id = (req.params.id);
    const cardIndex = cards.findIndex(card => card.id == id);
    const up_elements = req.body;
    const result = validateCard(req.body);
    console.log(result);
    console.log(id);

    if ( cardIndex == -1 || !result ) {
        return res.status(200).send("Card NOT available to update");
    }

    cards[cardIndex] = {
        ...cards[cardIndex],
        ...up_elements
    }  
    res.status(200).send("Card updated succesfully")
})
/* Server configuration port */
const PORT = process.env.port ?? 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})