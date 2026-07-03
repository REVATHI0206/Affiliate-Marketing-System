import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
      const res = await axios.get(
  "http://localhost:5000/api/products"
);

        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  const deleteProduct =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/${id}`
        );

        alert(
          "Product Deleted Successfully"
        );

        fetchProducts();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link to="/admin/add-product">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Product
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4">
                Image
              </th>
              <th className="p-4">
                Name
              </th>
              <th className="p-4">
                Price
              </th>
              <th className="p-4">
                Category
              </th>
              <th className="p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={
                    product._id
                  }
                  className="border-b text-center"
                >
                  <td className="p-4">
                    {product.image ? (
                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        className="w-20 h-20 object-cover rounded mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="p-4">
                    {
                      product.name
                    }
                  </td>

                  <td className="p-4">
                    ₹
                    {
                      product.price
                    }
                  </td>

                  <td className="p-4">
                    {
                      product.category
                    }
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

            {products.length ===
              0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-slate-500"
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}