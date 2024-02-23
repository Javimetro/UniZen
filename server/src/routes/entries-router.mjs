
import express from 'express';
import { getEntries, getEntryById, postEntry, putEntry, deleteEntry } from '../controllers/entries-controller.mjs';

const entryRouter = express.Router();



entryRouter.get('/', getEntries);
// GET http://127.0.0.1:3000/entries/<ID>
entryRouter.get('/:id', getEntryById);
// POST http://127.0.0.1:3000/entries/<ID>
entryRouter.post('/', postEntry);
// PUT
entryRouter.put('/:id', putEntry);
// DELETE
entryRouter.delete('/:id', deleteEntry);



export default entryRouter;

/*

ESIMERKIT

PUT - http://127.0.0.1:3000/entries/:entry_id
{
  "user_id": "3",
  "entry_date": "2024-02-12",
  "mood": "put testing",
  "weight": "100",
  "sleep_hours": "8",
  "notes": "testing PUTING entry"
}

POST

http://127.0.0.1:3000/entries/
{
  "user_id": "4",
  "entry_date": "2024-02-12",
  "mood": "testing again",
  "weight": "200",
  "sleep_hours": "8",
  "notes": "testing posting entry again"
}

*/
