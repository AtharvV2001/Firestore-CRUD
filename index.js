import express from "express";
import bodyParser from "body-parser";
import { db } from "./firebase.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const server = express();
const port = 3000;

server.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Firestore CRUD API',
      version: '1.0.0',
      description: 'API for Firestore CRUD operations',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./swaggerData.js'], // Path to the file where your routes are defined
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// CRUD Endpoints

// Find documents by key and value
server.post("/findInColletion/:collection", async (req, res) => {
  const { collection } = req.params;
  const { key, value } = req.body;

  if (!key || !value) {
    return res.status(400).send("Key and value must be provided in the request body.");
  }

  try {
    const querySnapshot = await db.collection(collection).where(key, "==", value).get();
    
    const documents = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, data: doc.data() });
      });
    }

    if (documents.length === 0) {
      return res.status(404).send(`No documents found in collection ${collection} with ${key} = ${value}`);
    }

    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create document
server.post("/:collection/:documentID", async (req, res) => {
  const { collection, documentID } = req.params;
  const data = req.body;

  try {
    await db.collection(collection).doc(documentID).set(data);

    // Fetch the newly created document and return it
    const doc = await db.collection(collection).doc(documentID).get();

    res.status(200).send({
      message: `Document ${documentID} added to collection ${collection}`,
      data: doc.data(),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read document
server.get("/:collection/:documentID", async (req, res) => {
  const { collection, documentID } = req.params;

  try {
    const doc = await db.collection(collection).doc(documentID).get();

    if (!doc.exists) {
      res.status(404).send(`No document found with ID ${documentID}`);
    } else {
      res.status(200).send(doc.data());
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update document
server.put("/:collection/:documentID", async (req, res) => {
  const { collection, documentID } = req.params;
  const data = req.body;

  try {
    await db.collection(collection).doc(documentID).update(data);

    // Fetch the updated document and return it
    const doc = await db.collection(collection).doc(documentID).get();

    res.status(200).send({
      message: `Document ${documentID} updated in collection ${collection}`,
      data: doc.data(),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete document
server.delete("/:collection/:documentID", async (req, res) => {
  const { collection, documentID } = req.params;

  try {
    const docRef = db.collection(collection).doc(documentID);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send(`No document found with ID ${documentID}`);
    }

    // Store the document data before deletion
    const deletedData = doc.data();

    // Delete the document
    await docRef.delete();

    // Return the deleted document's data
    res.status(200).send({
      message: `Document ${documentID} deleted from collection ${collection}`,
      deletedData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/:collection", async (req, res) => {
  const { collection } = req.params;

  try {
    const documents = [];
    const snapshot = await db.collection(collection).get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        documents.push({ id: doc.id, data: doc.data() });
      });
    }

    if (documents.length === 0) {
      return res
        .status(404)
        .send(`No documents found in collection ${collection}`);
    }

    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
