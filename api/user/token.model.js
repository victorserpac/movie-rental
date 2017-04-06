'use strict';

import db, { Sequelize } from '../../config/database';

let Token = db.sequelize.define( 'blacklistTokens', {
  token: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

export default Token;
