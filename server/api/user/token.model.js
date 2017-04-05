'use strict';

import db, { Sequelize } from '../../config/database';

let tokenSchema = db.sequelize.define( 'blacklistTokens', {
  token: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

export default tokenSchema;
