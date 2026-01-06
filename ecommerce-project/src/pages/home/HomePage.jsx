import apiClient from "../../utils/apiClient";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { ProductsGrid } from "./ProductsGrid.jsx"
import "./HomePage.css";

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const getHomeData = async () => {
        const response = await apiClient.get("/api/products");
        setProducts(response.data);
      };

      getHomeData();
    }, []);

  return (
    <>
      <title>YPerformance</title>
      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
