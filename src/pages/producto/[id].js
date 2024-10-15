import React, { useState, useEffect } from "react";
import Detail from "@/components/Detail";
import { useRouter } from "next/router";
import useStore from "@/store/store";

export default function DetailPage() {
    const { fetchProductById, product } = useStore();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [id, fetchProductById]);

    if (!product) return <div>No se encontró el producto.</div>;

    return (
        <div>
            <Detail product={product} />
        </div>
    )
}
