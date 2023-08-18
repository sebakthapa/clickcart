export const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories", { cache: "force-cache" })
    const data = await res.json();
    return data;
}
  


export const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products", { cache: "force-cache" })
    const data = await res.json();
    return data;
}
  
export const fetchSingleProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: "force-cache" });
    const res = await response.json();
    return res;
}
  
export const fetchByCategory = async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const res = await response.json();
    return res;
}