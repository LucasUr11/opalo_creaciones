import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Loader2, Package, AlertTriangle, XCircle } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setProducts(data);
        setIsLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const totalProducts = products.length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const noStock = products.filter(p => p.stock === 0).length;

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Seguro que querés eliminar este producto?");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Error al eliminar producto");
        } else {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-[#e6e0cf]">

            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <h1
                        className="text-3xl text-[#5297ac] font-light"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                        Panel Administrativo
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-[#baa6a5] hover:text-[#5297ac] transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <MetricCard
                        title="Total productos"
                        value={totalProducts}
                        icon={<Package className="w-6 h-6" />}
                        color="bg-[#5297ac]"
                    />

                    <MetricCard
                        title="Stock bajo"
                        value={lowStock}
                        icon={<AlertTriangle className="w-6 h-6" />}
                        color="bg-[#debfb5]"
                    />

                    <MetricCard
                        title="Sin stock"
                        value={noStock}
                        icon={<XCircle className="w-6 h-6" />}
                        color="bg-[#baa6a5]"
                    />

                </div>

                {/* Botón Nuevo */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => navigate("/admin/new")}
                        className="flex items-center gap-2 bg-[#5297ac] hover:bg-[#5297ac]/90 text-white px-5 py-3 rounded-xl transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Producto
                    </button>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {isLoading ? (
                        <div className="p-10 flex justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-[#5297ac]" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-[#a6c6c1]/30 text-[#3a3a3a] text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4">Imagen</th>
                                    <th className="px-6 py-4">Producto</th>
                                    <th className="px-6 py-4">Precio</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} className="border-t hover:bg-[#e6e0cf]/40 transition-colors">
                                        <td className="px-6 py-4">
                                            {product.images && product.images.length > 0 ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-14 h-14 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 bg-[#e6e0cf] rounded-lg flex items-center justify-center text-xs text-[#baa6a5]">
                                                    Sin imagen
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-[#3a3a3a]">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 text-[#5297ac] font-semibold">
                                            ${product.price?.toLocaleString("es-AR")}
                                        </td>
                                        <td className={`px-6 py-4 font-medium ${product.stock === 0
                                            ? "text-red-500"
                                            : product.stock <= 5
                                                ? "text-orange-500"
                                                : "text-green-600"
                                            }`}>
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">

                                            {/* Editar */}
                                            <button
                                                onClick={() => navigate(`/admin/edit/${product.id}`)}
                                                className="text-[#5297ac] hover:text-[#5297ac]/70 transition-colors"
                                            >
                                                <Pencil className="w-5 h-5 inline" />
                                            </button>

                                            {/* Eliminar */}
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-[#baa6a5] hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5 inline" />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    );
}

/* ---------- Metric Card Component ---------- */

function MetricCard({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div className={`${color} text-white p-3 rounded-xl`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-[#baa6a5]">{title}</p>
                <p className="text-2xl font-semibold text-[#3a3a3a]">{value}</p>
            </div>
        </div>
    );
}