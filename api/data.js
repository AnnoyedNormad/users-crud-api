let users = [];
let currentId = 1;

const ErrNotFound = {Message: "User not found!"}

module.exports = {
    addUser: (user) => {
        user.id = currentId++;
        users.push(user);
    },
    usersList: () => {
        return users;
        },
    getUser: (id) => {
        return users.find((user) => user.id === id);
    },
    deleteUser: (id) => {
        let userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return ErrNotFound;
        }

        return users.splice(userIndex, 1);
    },
}