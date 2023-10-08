const express = require('express');
const router = express.Router();


  /*.get('/', function (req, res) {
    res.writeHead(200)
    res.write("Hello I am GET")
    res.end()
  })*/
  router.post('/', (req, res) => {
    res.send("Hello I am POST")
  })
  .put('/', function (req, res) {
    // PUT
  })
  .delete('/', (req, res) => {
    // DELETE
  })

module.exports = router;
