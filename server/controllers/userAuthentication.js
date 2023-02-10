const jwt = require('jsonwebtoken')
const UserDB = require('../models/userModel/userSchema') 

const userAuthentication = async (req, res, next) => {
  // verify user is authenticated
  const token = req.header("Authorization")


  try {
    const { userID } = jwt.verify(token, process.env.SECRET_TOKEN_USER)
    req.user = await UserDB.findOne({_id:userID })

    if(req.user.blockStatus==false){
      next()  
    }else{
      res.json({status:'blocked', msg:'The user is blocked list'})
    }

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = userAuthentication