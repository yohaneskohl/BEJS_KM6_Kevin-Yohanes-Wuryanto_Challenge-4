const router = require('express').Router();

const userController = require('../../controllers/v1/userController');
router.post('/auth/register', userController.register);
router.get('/auth/register', userController.index);
router.get('/auth/register/:id', userController.show);

const accountController = require('../../controllers/v1/accountController');
router.post('/accounts', accountController.createAccount);
router.get('/accounts', accountController.index);
router.get('/accounts/:id', accountController.show);

const transactionController = require('../../controllers/v1/transactionController');
router.post('/transaction', transactionController.create);
router.get('/transaction', transactionController.index);
router.get('/transaction/:id', transactionController.show);

module.exports = router;