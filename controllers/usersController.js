const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const usersDataPath = path.join(__dirname, '../database/usersData.json');
const usersDataText = fs.readFileSync(usersDataPath, 'utf-8');
const usersList = JSON.parse(usersDataText);

function saveChangesUser(){
    const usersDataStringified = JSON.stringify(usersList);
    fs.writeFileSync(usersDataPath, usersDataStringified, 'utf-8'); 
};

module.exports = {

        //USER CONTROLLER SECTION

        registrationForm:(req, res) => {
            res.render('register')
        },
    
        createUser: (req, res) => {

            //Create a var to store errors. All data sent by user arrive to 'req', that's why we want the result of validating that request
            let errors = validationResult(req);

            if (errors.isEmpty()){
                //Each field of form assigned as key to each property of the new object created
                // let user = req.body ;
                let user = {
                    id: Date.now(),
                    usertype: req.body.usertype,
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    birthdate: req.body.birthdate,
                    email: req.body.email,
                    country: req.body.country,
                    profilePic: req.body.profilePic,
                    password: req.body.password,
                };
                
                // add user to array of users... and save changes
                usersList.push(user);

                saveChangesUser(user);


                res.redirect('/');

            } else {
                // if there exist any errors we turn back to form
                return res.render('register', {errors: errors.errors});

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
                let userLoggingIn = undefined;
                //then we must consult wether the credentials (username & pass) are correct
                for ( let i=0; i < usersList.length; i++ ) {
                    if (usersList[i].username == req.body.username) {
                        if (usersList[i].password == req.body.password) {
                            userLoggingIn = usersList[i];
                            break;
                        };
                    };
                };
                if ( userLoggingIn == undefined ){
                    return res.render('login', {errors: [
                        {msg: 'Credenciales inválidas'}
                    ]});
                }

                req.session.userLoggedIn = userLoggingIn;
                res.redirect('/');

            }else{
                return res.render('login', {errors: errors.errors});
            }
            let user = {
                username: req.body.username,
                password: req.body.password
            }
    
            res.redirect('/');
        },
    
        edit: (req, res) => {

            //Bring to form all data registered in order to visualize it and eventually edit it
            //save in var the URL param 
            const idUser = req.params.idUser;

            //save in var the result of searching the user with same id that the URL param 
            const userToEdit = usersList.find( user => user.id == idUser );

            //render the form with all data recovered
            res.render('userEdit', {userToEdit: userToEdit});
        },
    
        editConfirm: (req, res) => {
            
            //Save in var the URL param
            const idUser = req.params.idUser;
            
            console.log(`----> idUser = ${idUser}`);

            //Save in var the result of searching de position of that id in the array of users
            const indexUser = usersList.findIndex( user => user.id == idUser );
            
            console.log(`----> put index idUser = ${indexUser}`);
            
            // Save in var the updated fields of form
            let updatedUser = {
                id: req.params.idUser,
                usertype: req.body.usertype,
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                birthdate: req.body.birthdate,
                email: req.body.email,
                country: req.body.country,
                profilePic: req.body.profilePic,
                password: req.body.password,
            };

            console.log(`----> updateUser ${updatedUser}`);

            //Assign to the position of the array the results of the user data modified
            usersList[indexUser] = updatedUser;
    
            saveChangesUser();
    
            res.redirect('/');
        },
        
        deleteConfirm: (req, res) => {
            res.redirect('/');
        }
};