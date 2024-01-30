class UserService {
  constructor() {
    this.users = [
      { id: '1', name: 'Deivi', lastname: 'Herrera', email: 'd@g.com' },
      { id: 2, name: 'Dayana', lastname: 'Vargas', email: 'v@g.com' },
    ];
  }

  findUsers() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((user) => user.id == id);
    return user;
  }

  create(data) {
    const userIndex = this.users.length;
    this.users.push(data);
    return this.users[userIndex];
  }

  findIndexUser(id) {
    const userIndex = this.users.findIndex((user) => user.id == id);
    return userIndex;
  }

  update(updatedUser, index) {
    this.users[index] = updatedUser;
  }

  updatePath(name, lastname, email, index) {
    const userToUpdate = this.users[index];

    if (name) userToUpdate.name = name;
    if (lastname) userToUpdate.lastname = lastname;
    if (email) userToUpdate.email = email;

    return userToUpdate;
  }
  delete(index) {
    this.users.splice(index);
  }
}

module.exports = UserService;
