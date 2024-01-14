const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

exports.listAllComments = async(req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.post_id });
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erreur serveur'});
    }
}

exports.createAComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            res.status(404).json({ message: "Post non trouvé." });
            return;
        }

        const newComment = new Comment({ ...req.body, post_id: req.params.post_id });
        const comment = await newComment.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.getAComment = async (req, res) => {
    try {
        console.log(req.params.comment_id);
        const comment = await Comment.findById(req.params.comment_id);

        if (!comment) {
            res.status(404).json({ message: "Commentaire non trouvé." });
            return;
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.updateAComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body, { new: true });

        if (!comment) {
            res.status(404).json({ message: "Commentaire non trouvé." });
            return;
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.deleteAComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.comment_id);

        if (!comment) {
            res.status(404).json({ message: "Commentaire non trouvé." });
            return;
        }

        res.status(200).json({ message: "Commentaire supprimé" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};