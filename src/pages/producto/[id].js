import React, { useState, useEffect } from "react";
import Detail from "@/components/Detail";
import { useRouter } from "next/router";

export default function DetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const response = await fetch(`http://localhost:5000/api/productos/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error('Error al obtener el producto');
                }
            };
            fetchProduct();
        }
    }, [id]);

    if (!product) return <div>Cargando...</div>

    return (
        <div>
            <Detail product={product} />
        </div>
    )
}
