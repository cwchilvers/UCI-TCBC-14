const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models/models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed posts, assign to random user
  const posts = [];
  for (const post of postData) {
    const createdPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(createdPost);
  }

  // Seed posts, assign to random user and random post
  await Comment.bulkCreate(
    commentData.map((comment) => ({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    }))
  );

  process.exit(0);
};

seedDatabase();
