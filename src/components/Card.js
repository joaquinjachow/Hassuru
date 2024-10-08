import React from "react";
import Link from "next/link";

export default function Card({ currentProducts, getDisponibilidad }) {
    console.log(currentProducts)
    return (
        <div className="grid grid-cols-4 gap-4">
            {currentProducts.map((product, index) => {
                const disponibilidad = getDisponibilidad(product);
                return (
                    <Link href={`/catalogo/${product._id}`} key={product.id}>
                        <div key={index} className="flex flex-col justify-between h-full transition-transform transform hover:scale-105">
                            <img
                                src={product.image?.url || "/images/default.png"}
                                alt={product.nombre}
                                className="object-contain w-full mb-3"
                            />
                            <h3 className="text-lg font-semibold">{product.nombre}</h3>
                            <div className="flex flex-col mt-2">
                                <p className="text-lg font-bold text-gray-800">
                                    ${product.precios.USD} USD
                                </p>
                                <span className={disponibilidad.color}>{disponibilidad.message}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}