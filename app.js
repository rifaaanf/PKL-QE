require('nodemon')
const express =  require('express')
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 5000

//gunakan ejs
app.set('view engine', 'ejs')

//third-party middleware
app.use(expressLayout)

//built-in middleware
app.use(express.static('public'))




// app.get('/', (req, res) => {
//     res.render('admin', {
//         layout: 'layouts/main-layout-admin'})
//     });
    
app.get('/', (req, res) => {
    res.render('proposer', {
        layout: 'layouts/main-layout-proposer'})
    });
    

app.get('/proposer', (req, res) => {
    res.render('proposer', {
        title: 'Halaman Pengusul', 
        layout: 'layouts/main-layout-proposer'
    })
});

app.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Halaman Admin', 
        layout: 'layouts/main-layout-admin'
    })
});


app.use((req, res) => {
    res.status(404);
    res.send("<h1>404</h1>")
});

app.listen(port,() => {
    console.log(`App listening to port: ${port}`)
})

