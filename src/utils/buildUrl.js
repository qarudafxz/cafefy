export const buildUrl = (path) => {
	return import.meta.env.DEV ? `http://localhost:3000${path}` : `/api/${path}`;
};
