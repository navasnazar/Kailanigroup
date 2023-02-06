const jwt = require('jsonwebtoken')
const AdminDB = require('../models/adminModel/adminSchema')

const userAuthentication = async (req, res, next) => {
  // verify user is authenticated
  const token = req.header("Authorization")
  

  try {
    const { admin } = jwt.verify(token, process.env.SECRET_TOKEN_ADMIN)
    
    req.admin = await AdminDB.findOne({ admin }).select('username')
    next()  

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = userAuthentication