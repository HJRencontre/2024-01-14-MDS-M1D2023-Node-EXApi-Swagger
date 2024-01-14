/**
 * @openapi
 * definitions:
 *   schemas:
 *      User:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: The user's email address
 *                  unique: true
 *              password:
 *                  type: string
 *                  description: The user's password
 */

module.exports = (server) => {
    const userController = require("../controllers/userController");
    /**
     * @swagger
     * /users/register:
     *   post:
     *     summary: Register a user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/schemas/User'
     *     responses:
     *       200:
     *         description: Utilisateur enregistré avec succès
     *       400:
     *         description: Données invalides
     *       500:
     *         description: Erreur serveur
     */
    server.post("/users/register", userController.userRegister);

    /**
     * @openapi
     * /users/login:
     *   post:
     *     summary: Log as a user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *          application/json:
     *              schema:
     *                  $ref: '#/definitions/schemas/User'
     *     responses:
     *       200:
     *         description: Successfully logged in user
     *       401:
     *         description: Incorrect email or password
     *       500:
     *         description: User not found or an error occurred during processing
     */
    server.post("/users/login", userController.userLogin);
}