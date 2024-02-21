import { NextFunction, Request, Response, Router } from 'express';
import { pokedex } from '../utils/pokedex.ts';

const router = Router();

// middleware
const paginatedResults = (model: any) => {
	return (request: Request, response: any, next: NextFunction) => {
		const { page, size } = request.query;
		const currentPage = page ? +page : 0;
		const pageSize = size ? +size : 10;

		const startIndex = currentPage * pageSize;
		const endIndex = (currentPage + 1) * pageSize;

		const result: any = {};
		result.currentPage = currentPage;
		result.pageSize = pageSize;
		result.totalElements = model?.length || 0;
		result.results = model.slice(startIndex, endIndex);

		response.pagedResults = result;
		next();
	};
};

router.get('/pokemon/list/all', (request: Request, response: any) => {
	response.json(pokedex);
});

router.get(
	'/pokemon/list',
	paginatedResults(pokedex),
	(request: Request, response: any) => {
		response.json(response.pagedResults);
	}
);

export default router;
