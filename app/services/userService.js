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
    if (!user) throw boom.notFound('Usuario no encontrado');
    return user;
  }

  create(data) {
    const userIndex = this.users.length;
    const created = this.users.push(data);
    if (!created) throw boom.badRequest('Fallo en la creación del usuario');
    return this.users[userIndex];
  }

  findIndexUser(id) {
    const userIndex = this.users.findIndex((user) => user.id == id);
    if (!userIndex) throw boom.badRequest('Indice de usuario no encontrado ');
    return userIndex;
  }

  update(updatedUser, index) {
    const updated = (this.users[index] = updatedUser);
    if (!updated) throw boom.conflict('Fallo en la actualización del usuario');
  }

  updatePath(name, lastname, email, index) {
    const userToUpdate = this.users[index];
    if (name) userToUpdate.name = name;
    if (lastname) userToUpdate.lastname = lastname;
    if (email) userToUpdate.email = email;
    if (!name || !lastname || !email)
      throw boom.conflict('Fallo en la actualización de campos del usuario');
    return userToUpdate;
  }

  delete(index) {
    const deleted = this.users.splice(index);
    if (!deleted) boom.conflict('Fallo en la eliminación del usuario');
  }
}

module.exports = UserService;
