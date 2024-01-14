/**
 * @openapi
 * definitions:
 *  schemas:
 *   Comment:
 *     type: object
 *     required:
 *       - name
 *       - message
 *       - post_id
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the comment
 *       message:
 *         type: string
 *         description: Content of the comment
 *       post_id:
 *         type: string
 *         description: ID of the post the comment belongs to
 */

module.exports = (server) => {
    const commentController = require("../controllers/commentController");

    server.route("/posts/:post_id/comments")
        /**
         * @openapi
         * /posts/{postId}/comments:
         *  get:
         *    summary: List all comments
         *    tags: [Comment]
         *    parameters:
         *      - name: postId
         *        in: path
         *        required: true
         *        type: string
         *    responses:
         *      200:
         *        description: The list of comments
         *      500:
         *        description: Internal server error
         */
        .get(commentController.listAllComments)
        /**
         * @openapi
         * /posts/{postId}/comments:
         *   post:
         *     summary: Create a new comment
         *     tags:
         *      - Comment
         *     parameters:
         *       - name: postId
         *         in: path
         *         required: true
         *         type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - message
         *             properties:
         *               name:
         *                 type: string
         *                 description: Name of the comment
         *               message:
         *                 type: string
         *                 description: Content of the comment
         *     responses:
         *       201:
         *         description: Successfully created comment
         *       404:
         *         description: Post not found
         */
        .post(commentController.createAComment);

    server.route("/comments/:comment_id")
        /**
         * @openapi
         * /comments/{commentId}:
         *  get:
         *    summary: Get a comment by its ID
         *    tags:
         *      - Comment
         *    parameters:
         *      - in: path
         *        name: commentId
         *        type: string
         *        required: true
         *    responses:
         *      200:
         *        description: The comment
         *      500:
         *        description: Internal server error
         */
        .get(commentController.getAComment)
        /**
         * @openapi
         * /comments/{commentId}:
         *  put:
         *    summary: Update a comment by its ID
         *    tags:
         *      - Comment
         *    parameters:
         *      - in: path
         *        name: commentId
         *        type: string
         *        required: true
         *    requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - message
         *             properties:
         *               name:
         *                 type: string
         *                 description: Name of the comment
         *               message:
         *                 type: string
         *                 description: Content of the comment
         *    responses:
         *      200:
         *        description: The comment
         *      500:
         *        description: Internal server error
         */
        .put(commentController.updateAComment);
}
