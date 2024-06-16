const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('users-crud-api')

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name INTEGER NOT NULL,
    age INTEGER NOT NULL
)`);

module.exports = {
    async usersList() {
        try {
            return await new Promise((resolve, reject) => {
                db.all('SELECT * FROM users', [], (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
            });
        } catch (err) {
            return null;
        }
    },

    async getUser(id) {
        return await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        })
    },

    async deleteUser(id) {
        return await new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve({Message: "User was successfully deleted"});
            });
        })
    },

    async addUser(user) {
        const lastID = await new Promise((resolve, reject) => {
            db.run('INSERT INTO users (name, age) VALUES (?, ?)', [user.name, user.age], function(err){
                if (err) reject(err);
                resolve(this.lastID);
            });
        });

        return {lastID, ...user}
    },

    async updateUser(id, user) {
        const prevUser = await this.getUser(id)

        const newAge = user.age || prevUser.age
        const newName = user.name || prevUser.name

        return await new Promise((resolve, reject) => {
            db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [newName, newAge, id], (err) => {
                if (err) reject(err);
                resolve({Message: "User was successfully updated"});
            })
        })

    },
}