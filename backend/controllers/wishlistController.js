// controllers/wishlistController.js
import User from '../models/User.js'
import Product from '../models/Product.js'

export const addToWishlist = async (req, res) => {
  const userId = req.user.id
  const productId = req.params.productId

  try {
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' })
    }

    user.wishlist.push(productId)
    await user.save()

    res.json({ message: 'Added to wishlist', wishlist: user.wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const removeFromWishlist = async (req, res) => {
  const userId = req.user.id
  const productId = req.params.productId

  try {
    const user = await User.findById(userId)
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId)
    await user.save()

    res.json({ message: 'Removed from wishlist', wishlist: user.wishlist })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist')
    res.json(user.wishlist)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
