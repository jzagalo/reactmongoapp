var http = require('http'),    
    express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    //pubUserModel = require('../src/model/pubUsers')(),
    falcor = require('falcor'),
    falcorExpress = require('falcor-express'),
    httpDataSource = require('falcor-http-datasource'),
    //routes = require('./routes'),
    Router = require('falcor-router'),
    //Article = require('./configMongoose'),
    app = express();

mongoose.connect('mongodb://localhost:27017/local', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/* const pubUser = new pubUserModel({
    username : 'admin',
    password : 'c5a0df4e293953d6048e78bd9849ec0ddce811f0b29f72564714e474615a7852',
    firstName : 'Kamil',
    lastName : 'Przeorski',
    email : 'kamil@mobilewebpro.pl',
    role : 'admin',
    verified : false,
    imageUrl : 'http://lorempixel.com/100/100/people/'
});
 */

app.server = http.createServer(app);

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// This is required by falcor-express middleware to correctly withi falcor-browser
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const articlesArrayFromDB = [
    {
        'articleId': '987654',
        'articleTitle': 'BACKEND Lorem ipsum - article one',
        'articleContent': 'BACKEND Here goes the content of the article'
    },
    {
        'articleId': '123456',
        'articleTitle': 'BACKEND Lorem ipsum - article two',
        'articleContent': 'BACKEND the Sky is the limit, the content goes here'
    }        
];

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res){        
    return new Router([
        {     
            route: "length",
            get: function() {   
                return {
                    path: ["length"],
                    value: articlesArrayFromDB.length
                };                
            }
      },
      {
          route: "articles[{ integers }]['id', 'articleTitle', 'articleContent']",
          get: function(pathSet) {              
              
         },
      },
    ]);
}));

app.server.listen(8080, function(){    
    console.log(`Started on port ${app.server.address().port}`);
});
