import sequelize from "../../config/db/index.js";
import { UUID, UUIDV4, STRING } from "sequelize";

const User = sequelize.define('User', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true
	},
	username: {
		type: STRING,
		allowNull: false
	},
	password: {
		type: STRING,
		allowNull: false
	},
	email: {
		type: STRING,
		allowNull: false
	},
	role: {
		type: STRING,
		defaultValue: 'user'
	}
});

export { User };