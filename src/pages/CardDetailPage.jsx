import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CardDetailPage = () => {
    const [products, setProducts] = useState([]);
    const [isOnline, setIsOnline] = useState(true);
    const [productDetail, setProductDetail] = useState(null); 
    const { cardTitle } = useParams();

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setIsOnline(true); 
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');
            setProducts(response.data.slice(0, 20)); 
        } catch (error) {
            console.error('Error fetching products:', error);
            setIsOnline(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        
            const foundProduct = products.find((item) => item.title === cardTitle);
            setProductDetail(foundProduct);
    }, [products, cardTitle]);

    // Loading state
    if (!productDetail && isOnline) {
        return (
            <div className="flex justify-center items-center flex-col p-5 gap-5 font-bold bg-red-300 h-[100px] max-w-xl m-auto mt-10">
                <h2 className="text-xl">Loading...</h2>
            </div>
        );
    }

    // Error state
    if (!isOnline) {
        return (
            <p className="text-center absolute bottom-0 bg-gray-200 shadow-inner shadow-gray-500  p-2">
                Something went wrong
            </p>
        );
    }

    return (
        <div className="flex justify-center items-center flex-col p-5 gap-5 font-bold">
            {productDetail ? (
                <>
                    <img
                        src={productDetail.category.image}
                        alt={productDetail.title}
                        className="w-1/3"
                    />
                    <h1>{productDetail.title}</h1>
                    <p>{productDetail.description}</p>
                    <button>Hello</button>
                </>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default CardDetailPage;




