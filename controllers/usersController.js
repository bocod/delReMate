const { body } = require('express-validator');
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
            //Each field of form assigned as key to each property of the new object created
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
            // let user = req.body ;
            
            
            // add user to array of users... and save changes
            usersList.push(user);

            saveChangesUser(user);


            res.redirect('/');
        },
    
        login: (req, res) => {
            res.render('login')
        },
    
        loginConfirmation: (req, res) => {
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