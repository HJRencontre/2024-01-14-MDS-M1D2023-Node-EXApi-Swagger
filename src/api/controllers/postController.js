const Post = require('../models/postModel');
const textApiProvider = require("../providers/textApiProvider");

exports.listAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200);
        res.json(posts);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.createAPost = async(req, res) => {
    try {
        const newPost = new Post(req.body);
        let randomTextPromise = textApiProvider.getRandomText();
        let response = await randomTextPromise;

        if(!newPost.content){
            newPost.content = response;
        } 

        let post = await newPost.save();

        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Requete invalide." })
    }
}

exports.getAPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if(!post){
            res.status(404).json({message: "Post non trouvé."});
            return;
        }

        res.status(200);
        res.json(post);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.updateAPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.post_id, req.body, {new: true});

        if(!post){
            res.status(404).json({message: "Post non trouvé."});
            return;
        }
        res.status(200);
        res.json(post);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.deleteAPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.post_id);
        if(!post){
            res.status(404).json({message: "Post non trouvé."});
            return;
        }
        res.status(200);
        res.json(post);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}