'use strict';

import db, { Sequelize } from '../../config/database';

let Media = db.sequelize.define( 'media', {
  code: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  movie_id: Sequelize.INTEGER,
  rented: Sequelize.BOOLEAN
});

export default Media;
