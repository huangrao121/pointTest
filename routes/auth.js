var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var db = require('../config/database')

var router = express.Router()

passport.use('local', new LocalStrategy(async function verify(username, password, cb){
  const result = await db.query('select * from bankusers where username=$1',[username])
  if(result.rows.length>0){
    let user = result.rows[0]
    if(user.password === password){
      return cb(null, user)
    }else{
      return cb(null, false, {message: 'incorrect username of password'})
    }
  }
}))

router.post('/login', passport.authenticate('local', {
  
}),async (req,res)=>{
  const result = await db.query('select * from bankusers where username=$1',[req.body.username])
  if(!result){
    await db.query('insert into bankusers (username, password) values ($1, $2)', [req.body.username, req,body.password])
  }else{
    res.send('account exist')
  }
})

router.post('/logout', (req,res)=>{

})

module.exports = router
