// pages/api/achat/locals/[id].jsx
import connectDB from '@/config/database';
import LocationModel from '@/models/locationModel';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const location = await LocationModel.findById(id);
        if (!location) {
          return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
