let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');  // Esto indica que se renderice el archivo 'index.ejs'
});




module.exports = router;
