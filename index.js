const express = require('express')

const app = express() //On express server

app.use(express.json())

const customers = [   // Array of Objects
    {
        id : 1,
        name : 'Abhishek'
    },
    {
        id : 2,
        name : 'Darshan'
    },
    {
        id : 3,
        name : 'Moniraj'
    },
    {
        id : 4,
        name : 'Aniket'
    }
]

app.get('/',(req,res)=>{   // Default request
    res.send("Welcome to Customer API");
})

app.get('/api/customers/',(req,res)=>{  
    res.send(customers);
})

app.get('/api/customers/:id',(req,res)=>{   //Using query Paramas
    const customer = customers.find(cust => cust.id === parseInt(req.params.id)) // Here by default req params comes in string format so we have to convert to match with given data
    if(!customer) res.status(404).send('Customer Not Found');
    res.send(customer);
})

app.post('/api/customers/addCustomer',(req,res)=>{
    const customer ={
        id : customers.length+1,
        name : req.body.name
    }
    customers.push(customer);
    res.send(customer);
})

app.put('/api/customers/:id',(req,res)=>{
    const customer = customers.find(cust => cust.id === parseInt(req.params.id))
    if(!customer) res.status(404).send("Customer not Found");

    customer.name = req.body.name;
    res.send(customer);
})

app.delete('/api/customers/:id',(req,res)=>{  // find by id and then delete
    const customer = customers.find(cust => cust.id === parseInt(req.params.id))
    if(!customer) res.status(404).send("Customer not Found");

    const index = customers.indexOf(customer);
    customers.splice(index,1) // To delete mentioned index by 1

    res.send(customer);
})

app.listen(3000,(error)=>{
    if(error)
    {
        console.log("Error in Connecting to Server");
    }
    console.log("Successfully connected");
})