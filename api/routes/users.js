const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// update a user
router.put('/:id', async (req, res) => {

    if (req.body.userId == req.params.id) {
        if (req.body.password) {
            const salt = bcrypt.genSalt(10);
            req.body.password = bcrypt.hash(req.body.password, salt);
        }
        try {

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });

            res.status(200).json(updatedUser);


        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(401).json("Permission denied");
    }

});

// delete a user
router.delete('/:id', async (req, res) => {
    if (req.body.userId == req.params.id) {

        try {
            const user = findById(req.params.id);
            try {

                // after deleting the user, delete the user's posts

                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted");
            } catch (error) {

                res.status(500).json(error);

            }
        }
        catch (error) {
            res.status(500).json("User not found");
        }

    }
    else {
        res.status(401).json("Permission denied");
    }
});

// get a user 
router.get('/', async (req, res) => {

    const username = req.query.username;
    const userId = req.query.userId;

    try {

        const user = userId ? await User.findById(userId) : await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json("User not found");
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (error) {

        res.status(502).json(error);

    }
});

// get friends of a user
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.following.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(501).json(err);
    }
  });



// follow a user
router.put('/follow/:id', async (req, res) => {
    if (req.body.userId !== req.params.id) {

        try {

            const user_to_follow = await User.findById(req.params.id);
            const me = await User.findById(req.body.userId);

            if (!user_to_follow.followers.includes(req.body.userId)) {
                await user_to_follow.updateOne({ $push: { followers: req.body.userId } });
                await me.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("User Followed");
            }
            else {
                res.status(401).json("Already following");
            }


        } catch (error) {
            res.status(500).json(error);
        }

    }
    else {
        res.status(401).json("Use can't follow Yourself");
    }
});


// unfollow a user
router.put('/unfollow/:id', async (req, res) => {
    if (req.body.userId !== req.params.id) {

        try {

            const user_to_unfollow = await User.findById(req.params.id);
            const me = await User.findById(req.body.userId);

            if (user_to_unfollow.followers.includes(req.body.userId)) {
                await user_to_unfollow.updateOne({ $pull: { followers: req.body.userId } });
                await me.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("User unFollowed");
            }
            else {

                res.status(401).json("You don't follow this user");
            }


        } catch (error) {
            res.status(500).json(error);
        }

    }
    else {
        res.status(401).json("Use can't unfollow Yourself");
    }
});





module.exports = router;