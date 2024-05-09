import express from 'express';
import connectToDatabase from '../db/conn.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('likes');
    const likes = await collection.find({}).toArray();

    if (likes.length === 0) {
      console.log("No liked characters found");
    } else {
      console.log(`Found ${likes.length} liked characters`);
    }

    res.json(likes);
  } catch (e) {
    console.error('Error fetching likes', e);
    res.status(500).send('Failed to fetch likes');
  }
});

router.post('/', async (req, res) => {
    try {
      console.log("Received request to add like:", req.body);
  
      const db = await connectToDatabase();
      const collection = db.collection('likes');
  
      const character = req.body;
      const existingCharacter = await collection.findOne({ id: character.id });
      if (existingCharacter) {
        console.log('Character already liked:', existingCharacter);
        return res.status(400).json({ error: 'Character already liked' });
      }
  
      const result = await collection.insertOne(character);
      console.log("Added new liked character:", result.ops[0]);
  
      res.status(201).json(result.ops[0]);
    } catch (e) {
      console.error('Error adding like', e);
      res.status(500).json({ message: 'Failed to add like', error: e.toString() });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      console.log(`Attempting to delete character with ID: ${req.params.id}`);
  
      const db = await connectToDatabase();
      const { id } = req.params;
      const collection = db.collection('likes');
  
      const result = await collection.deleteOne({ id: id });
  
      if (result.deletedCount === 1) {
        console.log(`Character with ID ${id} deleted successfully.`);
        res.status(200).json({ message: 'Character deleted successfully' });
      } else {
        console.log(`Character with ID ${id} not found.`);
        res.status(404).json({ error: 'Character not found' });
      }
    } catch (e) {
      console.error('Error deleting like', e);
      res.status(500).send('Failed to delete like');
    }
  });  

export default router;
