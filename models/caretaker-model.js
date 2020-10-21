const pool = require("../pools");

class CareTaker {
  constructor() {
    this.pool = pool;
    this.table = "caretakers";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async get() {
    let query = `SELECT username FROM ${this.table};`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getSingleCareTaker(username) {
    let query = `SELECT t.username, t.type FROM (
      SELECT username, 'fulltime' AS type FROM fulltime_caretakers
      UNION
      SELECT username, 'parttime' AS type FROM parttime_caretakers
  ) AS t WHERE t.username = '${username}'`;
    const result = await this.pool.query(query);
    console.log(result);
    if (result.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        type: result.rows.map((r) => r.type),
      };
    }
  }

  async addNewCareTaker(username, password, role) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}', '${password}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        username: username,
        type: role,
      };
    }
  }
}

module.exports = new CareTaker();
