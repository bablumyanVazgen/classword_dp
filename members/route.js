const express = require('express');
const route = express.Router();
const { Members } = require('./controller');
const validation = require('./validation');

route.get('/', Members.index);
route.get('/:id', Members.show);
route.post('/', validation.create, Members.create);
route.put('/:id', validation.update, Members.update);
route.delete('/:id', Members.destroy);

module.exports = { route }