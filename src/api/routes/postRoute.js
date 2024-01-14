/**
 * @openapi
 * definitions:
 *  schemas:
 *      Post:
 *          type: object
 *          required:
 *              - title
 *              - content
 *          properties:
 *              title:
 *                  type: string
 *                  description: The post's title
 *              content:
 *                  type: string
 *                  description: The post's content
 */

module.exports = (server) => {
    const postController = require("../controllers/postController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/posts")
        /**
         * @openapi
         * /posts:
         *  get:
         *    summary: List all posts
         *    tags:
         *      - Posts
         *    responses:
         *      200:
         *          description: List of all post loaded
         */
        .get(postController.listAllPosts)
        /**
         * @openapi
         * /posts:
         *   post:
         *     summary: Create a new post
         *     tags:
         *      - Posts
         *     requestBody:
         *      required: true
         *      content:
         *          application/json:
         *              schema:
         *                  $ref: '#/definitions/schemas/Post'
         *     responses:
         *       200:
         *         description: Successfully created post
         *       401:
         *         description: Unauthorized
         */
        .post(jwtMiddleware.verifyToken, postController.createAPost);

    server.route("/posts/:post_id")
        .all(jwtMiddleware.verifyToken)
        /**
         * @openapi
         * /posts/{postId}:
         *   get:
         *     summary: Get a post by its ID
         *     tags:
         *       - Posts
         *     parameters:
         *       - in: path
         *         name: postId
         *         type: string
         *         required: true
         *     responses:
         *       200:
         *         description: The post
         *       500:
         *         description: Internal server error
         */
        .get(postController.getAPost)
        /**
         * @openapi
         * /posts/{postId}:
         *   put:
         *     summary: Update a post by its ID
         *     tags:
         *       - Posts
         *     parameters:
         *       - in: path
         *         name: postId
         *         type: string
         *         required: true
         *     requestBody:
         *      required: true
         *      content:
         *          application/json:
         *              schema:
         *                  $ref: '#/definitions/schemas/Post'
         *     responses:
         *       200:
         *         description: The post
         *       500:
         *         description: Internal server error
         */
        .put(postController.updateAPost)
        /**
         * @openapi
         * /posts/{postId}:
         *   delete:
         *     summary: Delete a post by its ID
         *     tags:
         *       - Posts
         *     parameters:
         *       - in: path
         *         name: postId
         *         type: string
         *         required: true
         *     responses:
         *       200:
         *         description: The post
         *       500:
         *         description: Internal server error
         */
        .delete(postController.deleteAPost)
}