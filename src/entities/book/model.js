import sequelize from '../../config/db/index.js';
import { UUID, STRING, DATE, UUIDV4 } from 'sequelize';

const Book = sequelize.define('Book', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true
	},
	title: {
		type: STRING,
		allowNull: false
	},
	author: {
		type: STRING,
		allowNull: false
	},
	publicationDate: {
		type: DATE
	},
	genres: {
		type: STRING
	}
});

export { Book };
