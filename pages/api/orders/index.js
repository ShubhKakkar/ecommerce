import Orders from "../../../models/Order";
import connectToDatabase from "../../../utils/db";

export default async function handler(req, res) {
  if(req.method !== 'GET') return;
  connectToDatabase();
  try {
    const Order = await Orders.find({});
    res.status(200).json(Order);
  }
  catch(err) {
    res.status(500).json({error: err.message})
  }
}
