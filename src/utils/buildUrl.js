export const buildUrl = (path) => {
	return import.meta.end.DEV ? `http://localhost:3000${path}` 
    : `/api/${path}`;
};
