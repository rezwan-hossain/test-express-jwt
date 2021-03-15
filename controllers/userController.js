const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register = (req, res)=>{
	const hashPassword = bcrypt.hashSync(req.body.password, 8)

	User.create({
		name : req.body.name,
    	email : req.body.email,
   	 	password : hashPassword
	}, (err, user)=>{
		if(err){
            console.log(err);
            res.status(400).json({error: 'somthing went wrong'})
        }
        // create json web token
        const token = jwt.sign({id: user._id}, 'secret', {expiresIn: 86400});
        res.status(200).send({
        	auth: true,
        	token: token
        })
	})
}

exports.myData = (req, res)=>{
	User.findById(req.userId, {password: 0}).exec((err, user)=>{
			if(err){
				return res.status(500).send("The was a problem finding the user")
			}
			if(!user){
				return res.status(404).send('User not found')
			}
			res.status(200).send(user)
		})
}

exports.login = (req, res)=>{
	User.findOne({email: req.body.email}).exec((err, user)=>{
		console.log(user)
		if(err){
			return res.status(500).send("The was a problem finding the user")
		}
		if(!user){
			return res.status(404).send('User not found')
		}

		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if(!passwordIsValid){
			return res.status(401).send({
				auth: false,
				token: null
			})
		}

		const token = jwt.sign({id: user._id}, 'secret', {expiresIn: 86400});
		res.status(200).send({
			auth: true, 
			token: token
		});
	})
}

exports.logout = (req, res)=>{
	res.status(200).send({
		auth: false,
		token: null
	})
}