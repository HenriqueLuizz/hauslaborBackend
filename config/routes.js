const express = require('express');
const auth = require('./auth');
const UserSummary = require('../api/userSummary/userSummaryService');

//const userID = 'users';
module.exports = function(server) {    
    // Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    // Rotas protegidas por Token JWT    
    const protectedApi = express.Router();
    server.use('/api', protectedApi);
    
    protectedApi.use(auth) //

    //Routes of API
    const userService = require('../api/user/userService');
    const userSummaryService = require('../api/userSummary/userSummaryService');
    const personService = require('../api/person/personService');
    const personSummaryService = require('../api/personSummary/personSummaryService');
    const examService = require('../api/exam/examService');
    
    //*****Person Service Routers******
  
    //personService.register(protectedApi, '/person');
    protectedApi.route('/person').get(userSummaryService.findUserID, personService.getPerson)
    //protectedApi.route('/GetIdPerson').get(personService.Person);
    .post(userSummaryService.findUserID, personService.createPerson)
    protectedApi.route('/person/:id').get(userSummaryService.findUserID, personService.getPerson)
    .put(userSummaryService.findUserID, personService.updatePerson)
    .delete(userSummaryService.findUserID, personService.deletePerson)
  
    protectedApi.route('/examinations').get(userSummaryService.findUserID, examService.getExamination)
    protectedApi.route('/personAddExam/:id').put(userSummaryService.findUserID, examService.createExaminations);
    protectedApi.route('/personUpdateExam/:id').put(userSummaryService.findUserID, examService.updateExaminations);
    protectedApi.route('/personDeleteExam/:id').put(userSummaryService.findUserID, examService.deleteExaminations);

    //*****Person Summary Service Routers******
    protectedApi.route('/personSummary').get(userSummaryService.findUserID, personSummaryService.getSummary);
    protectedApi.route('/personSummaryExaminations').get(userSummaryService.findUserID, personSummaryService.getExaminations);
    protectedApi.route('/personSummaryCountExaminations').get(userSummaryService.findUserID, personSummaryService.countExaminations);

    //*****User Service Routers******
    userService.register(protectedApi, '/users');

    //*****User Summary Service Routers******
    protectedApi.route('/userSummary').get(userSummaryService.countUser);
}
/*
const express = require('express');

module.exports = function(server) {

    const router = express.Router();
    server.use('/api', router);

    
    //Routes of API

    //Routers of Person
    const personService = require('../api/person/personService');
    personService.register(router, '/persons');
    
    const personSummaryService = require('../api/personSummary/personSummaryService');
    router.route('/personSummary').get(personSummaryService.getSummary);
    router.route('/personSummaryExaminations').get(personSummaryService.getExaminations);
    router.route('/personSummaryCountExaminations').get(personSummaryService.countExaminations);

    //Routers of User
    const userService = require('../api/user/userService');
    userService.register(router, '/users');

    const userSummaryService = require('../api/userSummary/userSummaryService');
    router.route('/userSummary').get(userSummaryService.countUser);

    router.route('/teste').get(function(req, res, next){
        res.send('Funcionou!');
    })
}
*/