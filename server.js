const express =require('express');
const morgan =require('morgan');
const bodyparser =require('body-parser');
const cors =require('cors');
const connectDB =require('./config/db')

const app =express();

//Connect to database
connectDB()




// Config dotev
require('dotenv').config({
    path: './config/config.env'
})

//use body parser
app.use(bodyparser.json())



// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

//Load all routes 

const authRouter =require('./routes/auth.route')


//Use Routes
app.use('/api/',authRouter);



app.use((req, res,next) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});