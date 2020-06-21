const express = require('express');
const {celebrate, Segments, Joi}= require('celebrate');


const ongController = require('./controllers/ongController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const connection = require('./database/connection');

const routes =  express.Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authotization: joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;