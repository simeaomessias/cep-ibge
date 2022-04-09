// ======================================================================
// MÓDULOS

import express from 'express'
import { engine } from 'express-handlebars';
import axios from 'axios'

const app = express()

// ======================================================================
// CONFIGURAÇÕES

// Usando express.json() e express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Usando a pasta publica na raiz do projeto
app.use(express.static('public'))

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// ======================================================================
// ROTAS

app.get('/', (req, res) => {
    res.render('home', {layout: 'main'})
})

app.post('/', (req, res) => {

    var cep = ""
    var uf = ""
    var cidade = ""
    var bairro = ""
    var rua = ""
    var cidadeId = ""
    var estado = ""
    var regiao = ""
    var listaCidades = []
    var relatorio = {}

    var erros = []

    cep = req.body.cep

    const urlCep = `https://brasilapi.com.br/api/cep/v1/${cep}`
    axios.get(urlCep).then((response) => {
  
        uf = response.data.state
        cidade = response.data.city
       
        if (!response.data.neighborhood || typeof response.data.neighborhood == undefined || response.data.neighborhood == null) {
            //
        } else  {
            bairro = response.data.neighborhood    
        }

        if (!response.data.street || typeof response.data.street == undefined || response.data.street == null) {
            //
        } else  {
            rua = response.data.street    
        }

        const urlEstado = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`
        axios.get(urlEstado).then( (response) => {
    
            estado = response.data.nome
            regiao = response.data.regiao.nome
    
            const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
            axios.get(urlCidades).then( (response) => {
        
                listaCidades = response.data
                cidadeId = listaCidades.filter((item) => {return item.nome === cidade})[0].id
    
                relatorio.cep = `${cep}`
                relatorio.regiao = `${regiao}`
                relatorio.estado = `${estado}`
                relatorio.cidade = `${cidade}`
                relatorio.bairro = `${bairro}`
                relatorio.endereco = `${rua}`
                relatorio.IBGE_Estado = `https://cidades.ibge.gov.br/brasil/${uf.toLowerCase()}`
                relatorio.IBGE_Cidade = `https://www.ibge.gov.br/cidades-e-estados?c=${cidadeId}`

                res.render('relatorio', {layout: 'main', relatorio: relatorio})
        
            }).catch( (error) => {
                
                erros.push ({'texto': 'Sem resposta de'})
                erros.push ({'texto': 'https://servicodados.ibge.gov.br/api'})
                res.render('home', {layout: 'main', erros: erros})
        
            })
    
        }).catch( (error) => {

            erros.push ({'texto': 'Sem resposta de'})
            erros.push ({'texto': 'https://servicodados.ibge.gov.br/api'})
            res.render('home', {layout: 'main', erros: erros})
   
        })
    
    }).catch((error) => {

        if (error.status = 400) {
            erros.push ({'texto': `CEP INVÁLIDO OU INEXISTENTE`})
            erros.push ({'texto': error.response.data.message})
            erros.push ({'texto': `${cep}`}) 
        } else {
            erros.push ({'texto': 'Sem resposta de'})
            erros.push ({'texto': 'https://brasilapi.com.br/api/cep/v1'})
        }
        
        res.render('home', {layout: 'main', erros: erros})

    })

})

// ======================================================================
// SERVIDOR

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})