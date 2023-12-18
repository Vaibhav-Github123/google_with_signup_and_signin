const router = require('express').Router()
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest ,(req, res) => {
    res.render('signup')
  })

  router.get('/in', ensureGuest ,(req, res) => {
    res.render('login',{userinfo:req.user})
  })


router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})
module.exports=router;