import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const index = cart.items.findIndex(i => i.product.equals(productId));
  if (index >= 0) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(201).json(cart);
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(i => i.product.equals(productId));
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
};

export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  cart.items = cart.items.filter(i => !i.product.equals(productId));
  await cart.save();

  res.json(cart);
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(204).end();
};
