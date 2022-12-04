const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');



// create a new post

router.post('/', async (req, res) => {

    const newPost = new Post(req.body);

    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// update a post


router.put('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId == req.body.userId) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedPost);
        }
        else {
            res.status(401).json("Permission denied");
        }

    } catch (error) {
        res.status(500).json(error);

    }
});



// delete a post


router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId == req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted");
        }
        else {
            res.status(401).json("Permission denied");
        }

    } catch (error) {
        res.status(500).json(error);

    }

});
// like a post
// unlike a post

router.put('/:id/like', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        
       
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post unliked");
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json(error);
    }

});


// get a post

router.get('/:id', async (req, res) => {

    try {
        const post = findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }

});

//get timeline posts

router.get("/timeline/:id", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);

        const userPosts = await Post.find({ userId: currentUser._id });
        // console.log(userPosts);
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all post of a user


router.get('/profile/:username', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }

});







module.exports = router;