const router = require('express')();
const db = require('../db.js')

router.get('/', async (req, res, next) => {
  try {
    let customers = await db.findSerie();
    res.render('index', { title: 'ExpressA', customers: customers });
  } catch (error) {
    console.log(`Error:${error}`);
    res.render("Error", { message: "Erro Listagem cliente", error });
  }
});

router.get('/new', (req, res, next) => {
  res.render("customer", { title: "Cadastrar um novo cliente", customer: {} });
});

router.post("/new", async (req, res, next) => {
  const { idade } = req.body;
  const { id } = req.body;

  if (!req.body.nome)
    return res.redirect('/new?error=Informe um nome');

  if (idade && !/[0-9]+/.test(idade))
    return res.redirect('/new?error=Idade deve ser um numero');

  req.body.idade = parseInt(idade);

  try {
    if (!id) {
      await db.insertCustomer(req.body);
    } else {
      await db.updateCustomer(id, req.body)
    }
    res.redirect("/");
  } catch (error) {
    console.log(`Error:${error}`);
    res.render("Error", { message: "Erro Cadastro do cliente", error });
  }

});

router.get('/edit/:customerId', async (req, res) => {
  const id = req.params.customerId;

  try {
    res.render("customer", { title: "Editar", customer: await db.findCustomer(id) })
  } catch (error) {
    console.log(`Error:${error}`);
    res.render("Error", { message: "Erro Atualização cliente", error });
  }
});

router.get('/delete/:customerId', async (req, res) => {
  const { customerId } = req.params;
  try {
    await db.deleteCustomer(customerId);
    res.redirect("/");
  } catch (error) {
    console.log(`Error:${error}`);
    res.render("Error", { message: "Erro Remover o cliente", error });
  }
});

module.exports = router;
