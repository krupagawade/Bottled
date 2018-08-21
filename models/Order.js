import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  beerName: {
    type: String,
    required: true,
    trim: true
  },
  _user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    maxlength: 10
  },
  status: {
    type: String,
    trim: true
  }
});

const Order = mongoose.model('order', orderSchema);

export default Order;
