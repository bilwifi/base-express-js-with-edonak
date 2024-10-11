const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// get, post, put, delete 

/**
 *  CRUD = Create  Read   Update  Delete
 *          POST   GET     PUT     DELETE
 */

/**
 * @param path 
 * @param function callbac
 */

const users = [
    {
        id:1,
        nom : "Nakasila",
        prenom: "Edouard"
    },
    {
        id:2,
        nom : "Dialu",
        prenom: "Peniel"
    }
];

app.get('/', (req, res) => {
  res.send('Bienvenu !')
})



app.get('/users', (req, res) => {
    // Test : utilisateur connecté , token valide, 
    const params = req.query
    if(params.id){
        const user = users.find(user => user.id == params.id)
        if(user) return res.status(200).json(user)
        res.status(404).json({
                    message: "Aucun user trouvé avec cet id"
                 })
    }
    res.status(200).json(users)
})

app.post('/users', (req, res) => {
    const { nom, prenom } = req.body

    if(!nom || !prenom) return res.status(400).json({message : "Vérifier vos parametres !"})

    // parametre ok,

    users.push({
        id: users.length + 1,
        nom,
        prenom
    })

    return res.status(200).json({
        message : "Utilisateur enregistré !"
    })
    
  })
app.put('/', (req, res) => {
    res.send('Hello PUT!')
    // logique 
  })
app.delete('/', (req, res) => {
    res.send('Hello DELETE!')
    // logique 
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})