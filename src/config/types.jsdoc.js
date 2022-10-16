/**
 * @typedef Car
 *
 * @property {number} id
 * @property {string} brand
 * @property {string} model
 * @property {number} year
 * @property {string} color
 * @property {number} price
 * @property {Date} createdAt
 * @property {Date} updatedAt
 *
 */

/**
 * @typedef Role
 *
 * @property {number} id
 * @property {string} name
 * @property {Date} createdAt
 * @property {Date} updatedAt
 *
 */

/**
 * @typedef User
 *
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {number} roleId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef Reservation
 *
 * @property {number} id
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {number} userId
 * @property {number} carId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 *
 */

/**
 * @typedef sequelize - Sequelize instance
 *
 * @property {string} db_name
 * @property {string} db_user
 * @property {string} db_password
 * @property {{db_host: string, dialect: string, port: number, pool: {max: number, min: number, aquire: number, idle: number}}} options
 */

/**
 * @typedef db - Database instance
 *
 * @property {sequelize} sequelize
 * @property {Sequelize} Sequelize
 *
 * @property {sequelize.Model} user
 * @property {sequelize.Model} car
 * @property {sequelize.Model} reservation
 * @property {sequelize.Model} role
 *
 */
