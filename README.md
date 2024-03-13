# Project - "Lepo"

This is a HyTe project where I aim to build an app that works as a diary where users can input about their mental state. The idea is that the app recommends mind training techniques to the users based on their inputs.

## TO DO:
- Implement NPL (Natural Language Processing) in the back end and render it in the front-end.
  1. User Submission: The user submits a diary entry via the frontend.
  2. Router: Directs the request to the appropriate controller function.
  3. Controller: Calls the NLP service to analyze the text.
  4. NLP Service: Performs sentiment analysis and keyword extraction, returns results.
  5. Controller: Generates recommendations based on the analysis, combines this with the original entry, and stores everything in the database.
  6. Response: The controller sends the recommendations back to the frontend to be displayed to the user.

