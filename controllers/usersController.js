const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const fetch = require('node-fetch');

const usersDataPath = path.join(__dirname, '../database/usersData.json');
const usersDataText = fs.readFileSync(usersDataPath, 'utf-8');
const usersList = JSON.parse(usersDataText);

const countriesController = require('./countriesController');

function saveChangesUser(){
    const usersDataStringified = JSON.stringify(usersList);
    fs.writeFileSync(usersDataPath, usersDataStringified, 'utf-8'); 
};

module.exports = {

        //USER CONTROLLER SECTION

        registrationForm: async(req, res) => {

            let countries = await fetch('https://restcountries.com/v2/all').then((result) => result.json());
            
            res.render('register', { countries } )
        },
    
        createUser: (req, res) => {

            //Create a var to store errors. All data sent by user arrive to 'req', that's why we want the result of validating that request
            let errors = validationResult(req);

            // if there exist errors we turn back to form with the errors
            if ( !errors.isEmpty() ) {
                return res.render('register', { 
                    errors: errors.array(),
                    oldData: req.body
                });
            };

            // Verifying wether the user attempting to register is already in DB
            // let userRegistered = User.findByField( 'email', req.body.email );
            // if ( userRegistered ) {
            //     return res.render( 'register', {
            //         errors : {
            //             email : {
            //                 msg : 'Usuario ya registrado'
            //             },
            //             oldData : req.body
            //         }
            //     });
            // };

            if ( errors.isEmpty() ){
                //Each field of form assigned as key to each property of the new object created
                // let user = req.body ;
                let user;
                let lastUser = usersList[usersList.length - 1];
                
                if (lastUser == undefined) {
                    user = {
                        id : 1,
                        ...req.body,
                        password : bcryptjs.hashSync( req.body.password, 12 ),
                        profilePic : req.file.filename,
                    };
                } else {
                    user = {
                        id : lastUser.id+1,
                        ...req.body,
                        password : bcryptjs.hashSync( req.body.password, 12 ),
                        profilePic : req.file.filename,
                    };
                }
                // add user to array of users... and save changes
                usersList.push(user);

                saveChangesUser(user);


                res.redirect('/users/login');

            };
        },
    
        login: (req, res) => {
            res.render('login')
            
        },
    
        loginConfirmation: (req, res) => {
            //In order to make validations we must ask if there exist any errors...
            let errors = validationResult(req);

            //If do not exist any error...
            if (errors.isEmpty()){
                let userLoggingIn;
                //then we must consult wether the credentials (username & pass) are correct
                for ( let i=0; i < usersList.length; i++ ) {
                    if (usersList[i].username == req.body.username) {
                        if (bcryptjs.compareSync( req.body.password, usersList[i].password )) {
                            userLoggingIn = usersList[i];
                            break;
                        };
                    };
                };
                if ( userLoggingIn == undefined ){
                    return res.render('login', {errors: [
                        {msg: 'Credenciales inv??lidas'}
                    ]});
                }
                delete userLoggingIn.password;
                req.session.userLoggedIn = userLoggingIn;

                //Check wether if the user has checked the remember session box and create cookie. 
                //The first param of the cookie() is the name we want to give to that cookie
                //The second param is what we want to store in that cookie 
                //The third param is the time that cookie will last in 'ms' miliseconds
                
                if(req.body.remember != undefined){
                    res.cookie('username', userLoggingIn.username, { maxAge: 600000 })
                }
                
                //res.send(`usuario logueado: ${req.session.userLoggedIn.name} ${req.session.userLoggedIn.surname}`);

                let user = req.session.userLoggedIn;
                
                return res.redirect(`/users/profile/${user.id}`);

            }else{
                return res.render('login', {errors: errors.errors});
            };
        },
        
        profile: (req, res) => {
            //Bring data from DB searching by the id provided by session, then we sent it to the view 
            const idUser = req.session.userLoggedIn.id;
            const userData = usersList.find( user => user.id == idUser );

            res.render('profile', { userData: userData });
        },

        edit: async(req, res) => {

            let countries = await fetch('https://restcountries.com/v2/all').then((result) => result.json());

            //Bring to form all data registered in order to visualize it and eventually edit it
            //save in a var the id of the user logged in
            const idUser = req.session.userLoggedIn.id;

            //save in var the result of searching the user with same id that the session id 
            const userToEdit = usersList.find( user => user.id == idUser );

            //render the form with all data recovered
            res.render('userEdit', {userToEdit: userToEdit, countries});
        },
    
        editConfirm: (req, res) => {

            //  !!!     Missing validating data before making changes

            //Save in var the session id
            const idUser = req.session.userLoggedIn.id;
            
            //console.log(`----> idUser = ${idUser}`);

            //Save in var the result of searching de position of that id in the array of users
            const indexUser = usersList.findIndex( user => user.id == idUser );
            
            //console.log(`----> put index idUser = ${indexUser}`);
            
            // Save in var the updated fields of form
            let updatedUser = {
                id: idUser,
                usertype: req.body.usertype,
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                birthdate: req.body.birthdate,
                email: req.body.email,
                country: req.body.country,
                profilePic: req.file.filename,
                password: bcryptjs.hashSync( req.body.password, 12 ),
            };

            //console.log(`----> updateUser ${updatedUser}`);

            //Assign to the position of the array the results of the user data modified
            usersList[indexUser] = updatedUser;
    
            saveChangesUser();
    
            res.redirect('/');
        
        },
        
        deleteConfirm: (req, res) => {
            // Buscar el indice del elemento user.id en el array de users
            // guardar el indice en una var
            // splice el array en esa posicion, 1 elemento
            //array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
            // array.splice(indexUserToDelete, 1);
            
            let userToDelete = usersList.findIndex(user => req.session.userLoggedIn.id === user.id);
            usersList.splice(userToDelete,1);
            saveChangesUser();
            req.session.destroy();
            res.redirect('/');        
            
        },

        signout: (req, res) => {
            
            req.session.userLoggedIn = undefined;

            res.redirect('/');
        }
};