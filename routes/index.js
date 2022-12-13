const router = require('express')();
const db = require('../db.js')

router.get('/', async (req, res, next) => {

  db.findSerie().then((customers) => {
    res.render('index', { title: 'ExpressA', customers: customers });
  }).catch(error => console.log(`Error:${error}`));

});

router.get('/new', (req, res, next) => {
  res.render("customer", { title: "Cadastrar um novo cliente" });
});

router.post("/new", (req, res, next) => {
  const { idade } = req.body;

  if (!req.body.nome)
    return res.redirect('/new?error=Informe um nome');

  if (idade && !/[0-9]+/.test(idade))
    return res.redirect('/new?error=Idade deve ser um numero');

  req.body.idade = parseInt(idade);

  db.insertCustomer(req.body)
    .then((success) => {
      console.log(`success:${success}`);
      res.redirect("/")
    }).catch(error => console.log(`ERROR:${error}`));
});

module.exports = router;
