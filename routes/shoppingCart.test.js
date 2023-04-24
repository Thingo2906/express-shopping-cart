process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb');
const carrot = {name: "carrot", price: 5.99};
//add an item to the cart befor each test
beforeEach(function(){
    items.push(carrot)
});

// empty the cart after each test
afterEach(function(){
    items.length = 0;
})
describe('GET/items', function(){
    test('list all items in the cart', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [carrot]})
    })
});

describe('POST/items', function(){
    test('add a new items to the list', async function() {
        const res = await request(app).post('/items').send({name: "peanut", price: 6.99});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: {name: "peanut", price: 6.99}})

    })
    test('Respond 400 if missing name', async function() {
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toBe(400);
    });
});

describe('PATCH/items/:name', function(){
    test('update the exist item', async() => {
        const res = await request(app).patch(`/items/${carrot.name}`).send({name: "tomato"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name: "tomato", price: 5.99}})
    });
    test('respond 404 if udating an invalid name', async () => {
        const res = await request(app).patch("/items/mango");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Item not found" });

    });
});

describe('DELETE/items/:name', function(){
    test('Test for deleting a item', async () => {
        const res = await request(app).delete(`/items/${carrot.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "deleted"});
    });
    test('respond 404 if delete invalid name', async () => {
        const res = await request(app).delete("/items/beef");
        expect(res.statusCode).toBe(404);
    });
})
 
