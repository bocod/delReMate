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
                usertype: req.body.usertype,
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                birthdate: req.body.birthdate,
                email: req.body.email,
                country: req.body.country,
                profilePic: req.body.profilePic,
                password: req.body.password
            };
            // let user = req.body ;
            console.log(user);
            
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
            const idUser = req.params.idUser;

            const userToEdit = usersList.find( user => user.id == idUser );

            res.render('userEdit', {userToEdit: userToEdit});
        },
    
        editConfirm: (req, res) => {
            const idUser = usersList.find( user => {
                user.id == req.params.idUser;
            });
            console.log(idUser);
            
            const updateUser = { ...req.body, };
    
            usersList[idUser] = updateUser;
    
            saveChangesUser();
    
            res.redirect('/');
        },
        deleteConfirm: (req, res) => {
            res.redirect('/');
        }
};