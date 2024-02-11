import { Router } from 'express';
import { matchedData, validationResult, checkSchema } from 'express-validator';
import { createEmployeeSchema, employeeQuerySchema } from '../utils/validationSchemas.mjs';

const router = Router();

const employeeList = [
  { name: 'Erwin Mertola', email: 'emertola@mailinator.com', id: 1 },
  { name: 'Irish Oshin Olande', email: 'iolande@mailinator.com', id: 2 }
]

router.get('/employees', (req, res) => {
  res.status(200).send(employeeList);
});

router.post('/employee', checkSchema(createEmployeeSchema), (req, res) => {
  const validationRes = validationResult(req);


  if (!validationRes.isEmpty()) {
    return res.status(400).send({ errors: validationRes.array() })
  }

  const matched = matchedData(req);
  const isExistingEmail = (email) => employeeList.find(employee => employee.email === email);
  try {
    if (!req.body.email) {
      const msg = 'Missing email!';
      throw new Error(msg);
    } else if (req.body.email && isExistingEmail(req.body.email)) {
      const msg = 'Employee with this email already exists!';
      throw new Error(msg);
    } else {
      const payload = {
        ...matched,
        id: Date.now()
      };
      employeeList.push(payload);
      res.status(201).send(payload);
    }

  } catch (error) {
    res.status(400).send({ error: error?.message || error });
  }
  res.sendStatus(201);
});

router.get('/employee/:id', (req, res) => {
  const { params } = req;
  const employee = employeeList.find(emp => emp.id === +params.id);

  try {
    if (!employee) {
      throw new Error('Employee not found!');
    } else {
      res.status(200).send(employee);
    }
  } catch (error) {
    res.status(404).send({ error: error?.message || error });
  }
});

router.get('/employee', checkSchema(employeeQuerySchema), (req, res) => {
  const validationRes = validationResult(req);

  if (!validationRes.isEmpty()) {
    return res.status(400).send({ errors: validationRes.array() })
  }
  const { query } = req;
  let results = [];
  Object.keys(query)
    .forEach(key => {
      const employeeItems = employeeList.filter(employee => employee.hasOwnProperty(key) && employee[key].toLowerCase().search(query[key].toLowerCase()) >= 0);
      results = [...results, ...employeeItems];
    });

  res.status(200).send(results);
})

export default router;