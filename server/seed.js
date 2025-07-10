const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./models/Video');
const User = require('./models/User');
const Channel = require('./models/Channel');
const Comment = require('./models/Comment');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await Video.deleteMany({});
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Comment.deleteMany({});

    // Create Users
    const user01 = await User.create({ username: 'user01', email: 'u1@mail.com', password: '123456' });
    const user02 = await User.create({ username: 'user02', email: 'u2@mail.com', password: '123456' });

    // Create Channel
    const channel01 = await Channel.create({
      channelName: 'TechExplained',
      description: 'Simplified tech tutorials',
      owner: user01._id,
      subscribers: 5000,
    });

    const comments = await Comment.create([
      { userId: user02._id, text: 'Amazing!', timestamp: new Date() },
      { userId: user02._id, text: 'So clear and concise', timestamp: new Date() }
    ]);

    // Sample thumbnails
    const thumbnails = [
      'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210122183844/How-to-Learn-ReactJS-in-2021.png',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240701150350/JavaScript-Tutorial-copy.webp',
      'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fs7yhmbfp59ml4q3trh09.jpg',
      'https://www.c-sharpcorner.com/article/what-is-redux-a-complete-beginners-guide/Images/What%20is%20the%20redux%20and%20how%20you%20can%20use%20it.JPG',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHcvQOBn4-IQQMAgPtihQpsEzYH4Y2nZs3w&s',
      'https://jaro-website.s3.ap-south-1.amazonaws.com/2024/04/Why-Python-800x400-.jpg',
      'https://i.ytimg.com/vi/XqCR-OeUy_M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCiABEdx8wAhq6C6uWcesNToIu4dA',
      'https://media.geeksforgeeks.org/wp-content/uploads/20230331172641/NodeJS-copy.webp',
      'https://img-c.udemycdn.com/course/750x422/3352204_9c9a_20.jpg',
      'https://i.ytimg.com/vi/32M1al-Y6Ag/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAvXzMNEi0c-4UeP9PUuGvruhZJAw',
      'https://i.ytimg.com/vi/ExcRbA7fy_A/maxresdefault.jpg',
      'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147485434/images/7d8522f-3343-70d6-3234-7d8ea88ce2_rest-api-model-http-request-response.webp'
    ];

    const titles = [
      'Learn React in 30 Minutes',
      'JavaScript Basics for Beginners',
      'CSS Flexbox Explained',
      'What is Redux?',
      'HTML Crash Course',
      'Python for Web Dev',
      'Tailwind CSS in 10 Minutes',
      'Node.js for Beginners',
      'Master Git & GitHub',
      'Express.js Crash Course',
      'MongoDB Tutorial',
      'REST API Basics'
    ];

    for (let i = 0; i < 12; i++) {
      await Video.create({
        title: titles[i],
        thumbnailUrl: thumbnails[i],
        description: `${titles[i]} - Full tutorial for beginners.`,
        channelId: channel01._id,
        uploader: user01._id,
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 1000),
        dislikes: Math.floor(Math.random() * 100),
        uploadDate: new Date(),
        comments: [comments[i % 2]._id]
      });
    }

    console.log('🎉 12 videos seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    mongoose.disconnect();
  }
};

seedData();
