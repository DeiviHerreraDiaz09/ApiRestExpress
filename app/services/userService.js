const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.users = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Deivi',
        lastname: 'Herrera',
        email: 'd@g.com',
      },
      {
        id: '550e8400-e29b-41d4-a716-424155440000',
        name: 'Dayana',
        lastname: 'Vargas',
        email: 'v@g.com',
      },
    ];
  }

  findUsers() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((user) => user.id == id);
    if (!user) throw boom.notFound('User not found');
    return user;
  }

  create(data) {
    const userIndex = this.users.length;
    const created = this.users.push(data);
    if (!created) throw boom.badRequest('Failed to create user');
    return this.users[userIndex];
  }

  findIndexUser(id) {
    const userIndex = this.users.findIndex((user) => user.id == id);
    if (userIndex === -1) throw boom.badRequest('User index not found');
    return userIndex;
  }

  update(updatedUser, index) {
    const updated = (this.users[index] = updatedUser);
    if (!updated) throw boom.conflict('Failed to update user');
    return updatedUser;
  }

  updatePath(data, index) {
    console.log(data);
    const { name, lastname, email } = data;
    const userToUpdate = this.users[index];
    if (name) userToUpdate.name = name;
    if (lastname) userToUpdate.lastname = lastname;
    if (email) userToUpdate.email = email;
    if (name === undefined && lastname === undefined && email === undefined)
      throw boom.conflict('Failure to update user fields');
    return userToUpdate;
  }

  delete(index) {
    const deleted = this.users.splice(index, 1);
    if (deleted.length === 0)
      boom.conflict('Failed to delete user');
    return deleted[0];
  }
}

module.exports = UserService;
