const CommentController = require('../controllers/CommentController');
const PostController = require('../controllers/postController');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

beforeEach(() => {
    jest.mock('../models/commentModel');
    jest.mock('../models/postModel');
})

describe('CommentController', () => {
    test('Should list all comments', async () => {
        const post = {
            _id: '5e7d0f7e4f6edf3b7c4a3e0f',
            title: 'title1',
            content: 'content1',
        }
        jest.spyOn(Post, 'findById').mockResolvedValue(post);

        const comments = [
            {
                name: 'title1',
                message: 'content1',
                post_id: post._id,
            },
            {
                name: 'title2',
                message: 'content2',
                post_id: post._id,
            }
        ]

        jest.spyOn(Comment, 'find').mockResolvedValue(comments);

        const req = {
            params: {
                id_post: post._id,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CommentController.listAllComments(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(comments);
    });

    test('Should create a comment', async () => {
        const post = {
            _id: '5e7d0f7e4f6edf3b7c4a3e0f',
            title: 'title1',
            content: 'content1',
        }

        jest.spyOn(Post, 'findById').mockResolvedValue(post);

        jest.spyOn(Comment.prototype, 'save').mockResolvedValue({
            name: 'name1',
            message: 'message1',
            post_id: post._id,
        });

        const req = {
            params: {
                post_id: post._id,
            },
            body: {
                name: 'name1',
                message: 'message1',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CommentController.createAComment(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            name: 'name1',
            message: 'message1',
            post_id: post._id,
        });
    });

    test('Should get a comment by id', async () => {
        const comment = {
            _id: '5e7d0f7e4f6edf3b7c4a3e0f',
            name: 'name1',
            message: 'message1',
            post_id: '5e7d0f7e4f6edf3b7c4a3e0f',
        }

        jest.spyOn(Comment, 'findById').mockResolvedValue(comment);

        const req = {
            params: {
                comment_id: comment._id,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CommentController.getAComment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(comment);
    });
    
    test('Should delete a comment', async() => {
        jest.spyOn(Comment, 'findByIdAndDelete').mockResolvedValue({
            name: 'name1',
            message: 'message1',
            post_id: '5e7d0f7e4f6edf3b7c4a3e0f',
        });
        
        const req = {
            params: {
                _id: '5e7d0f7e4f6edf3b7c4a3e0f',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        await CommentController.deleteAComment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});