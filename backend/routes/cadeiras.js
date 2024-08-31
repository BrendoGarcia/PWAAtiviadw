const express = require('express');
const router = express.Router();
const cadeiras = require('../models/Cadeiras');

// Criar uma cadeira nova
router.post('/', async (req, res) => {
    const { nomecadeira, detalhes, tipo } = req.body;
    const newCadeiras = new Cadeiras({ nomecadeira, detalhes, tipo });
    await newCadeiras.save();
    res.json(newCadeiras);
});


router.get('/', async (req, res) => {
    const cadeiras = await Cadeiras.find();
    res.json(cadeiras);
});


router.put('/:id', async (req, res) => {
    const { nomecadeira, detalhes, tipo } = req.body;
    const updatedCadeiras = await Cadeiras.findByIdAndUpdate(req.params.id, { nomecadeira, detalhes, tipo }, { new: true });
    res.json(updatedCadeiras);
});


router.delete('/:id', async (req, res) => {
    await Cadeiras.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reclamação deletada com sucesso!' });
});

module.exports = router;
