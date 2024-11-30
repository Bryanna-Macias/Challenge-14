import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
    // Update as tryout 
    // { username: 'UniversalComet', password: 'password2' },
  ], { individualHooks: true });
};
