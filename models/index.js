//Dependencies declaration
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Relationship setup
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment,{
  foreignKey: "user_id",
  as: "comment_creator"
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User,{
  foreignKey: "user_id",
  as: "comment_creator"
});


Post.hasMany(Comment,{
  foreignKey: "post_id",
  as: "post_comments"
});

Comment.belongsTo(Post,{
  foreignKey: "post_id",
  as: "post_comments"
});

module.exports = { User, Post, Comment };
