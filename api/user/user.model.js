'use strict';

import db, { Sequelize } from '../../config/database';
import bcrypt from 'bcrypt';

let userSchema = db.sequelize.define( 'user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: Sequelize.STRING
});

userSchema.beforeCreate( user => {
  return bcrypt.genSalt( 10 )
    .then( salt => bcrypt.hash( user.password, salt ) )
    .then( hash => user.password = hash )
    .catch( err => err );
});

export default userSchema;
