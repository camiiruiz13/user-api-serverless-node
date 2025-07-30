class Users {
  constructor() {
    this.users = [
      { id: 1, name: "Camilo", email: "crcamiruiz13@gmail.com" },
      { id: 2, name: "Ana", email: "anamariavargasj1590@gmail.com" },
      { id: 3, name: "Maria", email: "maesruiz6716@gmail.com" },
    ];
  }

    getAll() {
        return this.users;
    }

}
modulee.exports = Users;