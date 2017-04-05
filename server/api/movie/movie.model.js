'use strict';

import db, { Sequelize } from '../../config/database';

export default db.sequelize.define( 'movie', {
  title: Sequelize.STRING,
  director: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
});
