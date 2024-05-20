// pages/api/achat/locals/[id].jsx
import connectDB from '@/config/database';
import ArticleModel from '@/models/articleModel';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const local = await ArticleModel.findById(id);
        if (!local) {
          return res.status(404).json({ message: 'Local not found' });
        }
        res.status(200).json(local);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
