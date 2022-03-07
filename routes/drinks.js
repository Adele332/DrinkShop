const express = require('express')
const Drink = require('./../models/drink')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('drinks/new', { drink: new Drink() })
})

router.get('/edit/:id', async (req, res) => {
    const drink = await Drink.findById(req.params.id)
    res.render('drinks/edit', { drink: drink })
})

router.get('/:slug', async (req, res) => {
    const drink = await Drink.findOne({ slug: req.params.slug })
    if (drink == null) res.redirect('/')
    res.render('drinks/show', { drink: drink })
})

router.post('/', async (req, res, next) => {
    //console.log(res.body)
    req.drink = new Drink()
    next()
}, saveDrinkAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.drink = await Drink.findById(req.params.id)
    next()
}, saveDrinkAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Drink.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveDrinkAndRedirect(path) {
    return async (req, res) => {
        let drink = req.drink
        //let drink = new Drink()
        drink.title = req.body.title
        drink.description = req.body.description
        drink.markdown = req.body.markdown
        console.log(drink)
        try {
            drink = await drink.save()
            res.redirect(`/drinks/${drink.slug}`)
        } catch (e) {
            console.log(e)
            res.render(`drinks/${path}`, { drink: drink })
        }
    }
}

module.exports = router