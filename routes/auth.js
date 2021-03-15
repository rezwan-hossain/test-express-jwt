const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {register, myData, login} = require('../controllers/userController');


router.post('/register', register)
router.get('/me', verifyToken , myData);
router.post('/login', login)




//creating a middlewere
function verifyToken(req, res, next) {
	var token = req.headers['x-access-token'];

	if(!token){
		return res.status(401).send({
			auth: false,
			message: 'no token provided'
		})
	}
	jwt.verify(token, 'secret', (err, data)=>{
		if(err){
			return res.status(500).send({
				auth: false,
				message: 'Failed to authenticate token'
			})
		}
	req.userId = data.id;
	next()
    });

}


module.exports = router;