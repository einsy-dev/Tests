const checkTableExists = (data) => `SELECT EXISTS (
SELECT FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = '${data}');`;

const createTableIfNotExists = (data) => `CREATE TABLE ${data} (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) NOT NULL,
				status VARCHAR(255) NOT NULL,
				species VARCHAR(255) NOT NULL,
				type VARCHAR(255),
				gender VARCHAR(255),
				origin JSONB,
				location JSONB,
				image VARCHAR(255),
				episode VARCHAR(255)[],
				url VARCHAR(255),
				created DATE);`;

const addDataToTable = (tablename, data) => {
	return {
		query: `
		INSERT INTO ${tablename} 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
		ON CONFLICT (id) DO UPDATE SET
			name = EXCLUDED.name,
			status = EXCLUDED.status,
			species = EXCLUDED.species,
			type = EXCLUDED.type,
			gender = EXCLUDED.gender,
			origin = EXCLUDED.origin,
			location = EXCLUDED.location,
			image = EXCLUDED.image,
			episode = EXCLUDED.episode,
			url = EXCLUDED.url,
			created = EXCLUDED.created;`,
		values: [data.id, data.name, data.status, data.species, data.type, data.gender, data.origin, data.location, data.image, data.episode, data.url, data.created],
	}
};




export { checkTableExists, createTableIfNotExists, addDataToTable };