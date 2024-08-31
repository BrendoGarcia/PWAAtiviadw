const mongoose = require('mongoose');

const cadeiraSchema = new mongoose.Schema({
    nomecadeira: {
        type: String,
        required: true
    },
    detalhes: {
        type: String,
        required: true
    },
   tipo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cadeiras', cadeiraSchema);
