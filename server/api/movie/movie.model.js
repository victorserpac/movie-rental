'use strict';

import db, { Sequelize } from '../../config/database';

let Movie = db.sequelize.define( 'movie', {
  title: Sequelize.STRING,
  director: Sequelize.STRING
});

export default Movie;
