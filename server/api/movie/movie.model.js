'use strict';

import db, { Sequelize } from '../../config/database';

let movieSchema = db.sequelize.define( 'movie', {
  title: Sequelize.STRING,
  director: Sequelize.STRING
});

export default movieSchema;
