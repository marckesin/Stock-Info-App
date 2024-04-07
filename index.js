require('dotenv').config() // Necessário para as variáveis de ambiente
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');

// Importação das rotas
const indexRouter = require('./routes/index');
const cardsRouter = require('./routes/cards');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const updateRouter = require('./routes/update');
const deleteRouter = require('./routes/delete');
const companyRouter = require('./routes/company'); // Rota dinâmica

const port = process.env.PORT || 3000;
const app = express();

// Configuração da engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Configuração do banco de dados
const dbConfig = require('./config/database.config.js').local; // Banco de dados local para testes
const mongoose = require('mongoose');
const mongoUri = process.env.DATABASE_URI;

mongoose.Promise = global.Promise;

// Conectando ao banco de dados
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
}).then(() => {
  console.log('Conectado ao banco de dados com sucesso.');
}).catch((err) => {
  console.log('Não foi possivel conectar ao banco de dados: ', err);
  process.exit();
});

// Definição das rotas
app.use('/', indexRouter);
app.use('/cards', cardsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/:endpoint', companyRouter); // Rota dinâmica

app.listen(port);

module.exports = app;