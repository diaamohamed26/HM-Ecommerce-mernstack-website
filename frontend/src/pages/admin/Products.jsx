import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/admin/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Create or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }

    try {
      if (editingProduct) {
        // Update
        await axios.put(
          `http://localhost:5000/api/admin/products/${editingProduct._id}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingProduct(null);
      } else {
        // Create
        await axios.post("http://localhost:5000/api/admin/products", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ name: "", price: "" });
      setImages([]);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error saving product:", err);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      fetchProducts();
    }
  };

  // Edit Product (fill form)
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 mb-6 rounded grid gap-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h2 className="font-semibold">{product.name}</h2>
            <p>${product.price}</p>
            {product.images?.length > 0 && (
              <div className="flex gap-2 mt-2">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${img}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover border rounded"
                  />
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
