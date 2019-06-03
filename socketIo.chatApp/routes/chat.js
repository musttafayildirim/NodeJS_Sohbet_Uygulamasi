const express = require('express');
const router = express.Router();

/* chat sayfasını döndürür... */
router.get('/', (req, res, next) => {
  res.render('chat', {user : req.user});
});

module.exports = router;
