/**
 * @swagger
 * /{collection}/{documentID}:
 *   post:
 *     summary: Create a document in a Firestore collection
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore collection name
 *       - in: path
 *         name: documentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Document created successfully
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /{collection}/{documentID}:
 *   get:
 *     summary: Retrieve a document from a Firestore collection
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore collection name
 *       - in: path
 *         name: documentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore document ID
 *     responses:
 *       200:
 *         description: Document data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: No document found with the specified ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /{collection}/{documentID}:
 *   put:
 *     summary: Update a document in a Firestore collection
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore collection name
 *       - in: path
 *         name: documentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Document updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: No document found with the specified ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /{collection}/{documentID}:
 *   delete:
 *     summary: Delete a document from a Firestore collection
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore collection name
 *       - in: path
 *         name: documentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore document ID
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                 deletedData:
 *                   type: object
 *                   additionalProperties: true
 *       404:
 *         description: No document found with the specified ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /{collection}:
 *   get:
 *     summary: Get all documents from a Firestore collection
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore collection name
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Document ID
 *                   data:
 *                     type: object
 *                     description: Document data
 *       404:
 *         description: No documents found in the specified collection
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /findInColletion/{collection}:
 *   post:
 *     summary: Find documents by key and value in a Firestore collection
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firestore collection name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: The key to search for
 *               value:
 *                 type: string
 *                 description: The value to match for the specified key
 *     responses:
 *       200:
 *         description: List of documents matching the key-value criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Document ID
 *                   data:
 *                     type: object
 *                     description: Document data
 *       400:
 *         description: Bad request if key or value is not provided
 *       404:
 *         description: No documents found matching the criteria
 *       500:
 *         description: Internal server error
 */
