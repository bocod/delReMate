// This file will contain a model of a literal object in wich there will be the methods that will handle
// the CRUD actions

const fs = require('fs');

const User = {
    
    // At first we locate the file that contains de users data...
    filename : '../database/usersData.json',
    
    // Then the json file is converted to array in order to manipulate it,
    // and returned once it is parsed from string to array...
    // and we read it using the method readFileSync from fs 
    getData : () => {
        return JSON.parse( fs.readFileSync(this.filename, 'utf-8'))
    },

    // A 'findAll' method is created in order to easily access to all users array
    findAll : () => {
        return this.getData();
    },
    
    // A method to easily search by PK (primary key) == to 'id' is settled
    findByPK : (id) => {
        // We store the return of findAll()
        let allUsers = this.findAll();
        // And search that one that is coming by parameter using the method find() in order to return it
        let userFound = allUsers.find( aUser => aUser.id === id );
        return userFound;
    },

    // A more flexible method to easily search by any field
    // Using first param as field, and a second as the value
    // !!! THIS METHOD WILL RETURN ONLY THE FIRST RESULT THAT MATCH, NOT ALL !!!
    findByField : ( field, value ) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find( aUser => aUser[field] === value );
        return userFound;
    },

    // This method will create users
    // Again the array of users is bringed
    // in order to push the new user coming as parameter
    // Once this is done, the array is again turned into a JSON through the stringift method
    // And the old file is overwritten by the new with the writeFileSync method of 'fs'
    create : (userData) => {
        let allUsers = this.findAll();
        let newUser = {
            id = this.generateID(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync( this.filename, JSON.stringify( allUsers, null, ' ') );
        return true;
    },

    // As the previous method creates a user, an 'autoincremental id' method is needed to mantain the users DB in order
    // The work is delegated to the following method,
    // findAll again through allUsers, for poping the last user and save it in a var for returning that user.id + 1
    // In order to avoid the ERROR if the JSON is empty, we keep the JSON file with the '[]' empty array,
    // and the 'undefined' ERROR is avoided with a conditional if (users) { return user.id + 1} else { return 1 }     

    generateID : () => {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    // Next: Deleting a user. Again we use allUsers to save findAll result.
    // Then allUsers is filtered comparing with the id that comes in the function parameter
    // The file is overwritten with the new updated and filtered array
    delete : (id) => {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter( aUser => aUser.id !== id );
        fs.writeFileSync(this.filename, JSON.stringify( finalUsers, null, ' ' ));
        return true;
    }
}