'use strict';

import db, { Sequelize } from '../../config/database';

let Rent = db.sequelize.define( 'rent', {
  user_email: Sequelize.STRING,
  media_code: Sequelize.INTEGER
});

export default Rent;
