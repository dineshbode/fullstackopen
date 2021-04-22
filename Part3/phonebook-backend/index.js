const { request, response } = require('express')
const express = require('express')
const app = express()

const morgan = require('morgan')


app.use(express.json())

const bodyParser = require("body-parser")
const { format } = require('morgan')
app.use(bodyParser.urlencoded({
  extended:true
}))

const morganFormat =  (tokens, req, res) => {
  let format = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  if(req.method === 'POST'){
    format = format.concat(JSON.stringify(req.body))
  }
  return format.join(' ')
}

app.use(morgan(morganFormat))


let persons =
 [
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "bad",
        "number": "111",
        "id": 5
      },
      {
        "name": "Hello",
        "number": "1212",
        "id": 1
      },
      {
        "name": "sdfsdf",
        "number": "sdfsd",
        "id": 2
      },
      {
        "name": "aaaaa",
        "number": "88888888888",
        "id": 3
      },
      {
        "name": "Narayana",
        "number": "11111",
        "id": 6
      }
]

app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/info',(request,response) => {
    const totalPersons = persons.length
    const currentDate = new Date()
    response.send(`Phonebook has info for ${totalPersons} people. <br />
    ${currentDate}`)
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person => person.id === id)
    if(person.length > 0){
        response.json(person)
        console.log('if')
    }
    else{
        console.log('else')
        response.status(404).end() 
    }
})

app.delete('/api/persons/:id',(request,response) => {
    console.log('delete')
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ?
              Math.floor(Math.random()*10000):
              0
  return maxId+1
}

app.post('/api/persons',(request,response ,next) => {
  
  const { body} = request

  if(!body.name){
    return response.status(400).json({
      error: 'Name missing'
    })
  }
   
  if(!body.number){
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const existingName = persons.filter((person) => {
    return person.name === body.name
  })

  const existingNumber = persons.filter((person) => {
    return person.number === body.number
  })

  if(existingName.length === 1)
  {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  if(existingNumber.length === 1)
  {
    return response.status(400).json({
      error: 'Number must be unique'
    })
  }

    const newPerson = ({
      name: body.name,
      number: body.number,
      id: generateId()
    })

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log('Phonebook server started')