import { Router } from 'express';
import { pokedex } from '../utils/pokedex.mjs';

const router = Router();

// middleware
const paginatedResults = (model) => {
  return (request, response, next) => {
    const { page, size } = request.query;
    const currentPage = +page;
    const pageSize = +size;

    const startIndex = currentPage * pageSize;
    const endIndex = (currentPage + 1) * pageSize;

    const result = {};
    result.currentPage = currentPage;
    result.pageSize = pageSize;
    result.totalElements = model?.length || 0;
    result.results = model.slice(startIndex, endIndex);

    response.pagedResults = result;
    next();
  }
}

router.get('/pokemon/list/all', (request, response) => {
  response.json(pokedex);
});

router.get('/pokemon/list', paginatedResults(pokedex), (request, response) => {
  response.json(response.pagedResults);
});



export default router;