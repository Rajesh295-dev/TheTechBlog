//Declare dependencies
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },

        { 
          model: Comment, as: "post_comments",
          include: { model: User, as: "comment_creator", attributes: ['name']}
        }
      
      ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },

        { 
          model: Comment, as: "post_comments",
          include: { model: User, as: "comment_creator", attributes: ['name']}
        }
      ]
    });

    //Serialize data so the template can read it
    const post = postData.get({ plain: true });
    console.log({ ...post, logged_in: req.session.logged_in })

    res.render('update-post', {
      post,
      comment_creator: req.session.user_id, logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },

        { 
          model: Comment, as: "post_comments",
          include: { model: User, as: "comment_creator", attributes: ['name']}
        }
      ]
    });

    //Serialize data so the template can read it
    const post = postData.get({ plain: true });
    console.log({ ...post, logged_in: req.session.logged_in })

    res.render('post', {
      ...post,
      comment_creator: req.session.user_id, logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    
    //Serialize dara so the template can read it
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      comment_creator: req.session.user_id, logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

//Exports
module.exports = router;
