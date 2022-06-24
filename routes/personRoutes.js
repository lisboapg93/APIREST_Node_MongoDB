const router = require('express').Router()
const Person = require('../models/Person')


//rotas api
router.post('/', async(req, res) => {
    const {name, salary, approved} = req.body
    if (!name) {
        res.status(422).json({ error: 'O nome está faltando'})
    }
    const person = {
        name, 
        salary, 
        approved
    }
    //create 
    try{
        //criando dados
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    }catch (error){
        res.status(500).json({error: 'error'})
    }
})

router.get('/:id', async (req, res) => {
    //extrair os dados da requisicao
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

//update(PUT,PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const{ name, salary, approved} = req.body
    const person = {
        name, 
        salary, 
        approved
    }
    try{
        const updatedPerson = await Person.updateOne({_id: id}, person)
        res.status(200).json(person)
        if (updatePerson.matchedcount === 0) {
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }
    }catch(error){
        res.status(500).json({error: 'error'})
    }
})

//delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if (!person) {
        res.status(422).json({message: 'Usuario não encontrado'})
        return
    }
    try{
        await Person.deleteOne({_id: id})
        res.status(422).json({message: 'Usuario removido com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router