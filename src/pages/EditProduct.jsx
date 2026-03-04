import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (!error) setProduct(data);
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]:
                e.target.name === "price" || e.target.name === "stock"
                    ? Number(e.target.value)
                    : e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        let updatedImages = product.images || [];

        // 1️⃣ Si hay nueva imagen, subirla
        if (newImages.length > 0) {
            for (const image of newImages) {
                const fileName = `${Date.now()}-${image.name}`;

                const { error: uploadError } = await supabase.storage
                    .from("products")
                    .upload(fileName, image);

                if (uploadError) {
                    console.error(uploadError);
                    continue;
                }

                const { data } = supabase.storage
                    .from("products")
                    .getPublicUrl(fileName);

                updatedImages.push(data.publicUrl);
            }
        }

        // 2️⃣ Actualizar producto
        const { error } = await supabase
            .from("products")
            .update({
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                category: product.category,
                featured: product.featured,
                images: updatedImages,
            })
            .eq("id", id);

        setIsSaving(false);

        if (!error) {
            navigate("/admin");
        } else {
            alert("Error al actualizar producto");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#e6e0cf]">
                <Loader2 className="w-8 h-8 animate-spin text-[#5297ac]" />
            </div>
        );
    }

    const handleRemoveImage = async (imageUrl) => {
        if (!window.confirm("¿Eliminar esta imagen?")) return;

        // 1️⃣ Obtener nombre del archivo desde la URL
        const fileName = imageUrl.split("/products/")[1];

        // 2️⃣ Eliminar del storage
        const { error: storageError } = await supabase.storage
            .from("products")
            .remove([fileName]);

        if (storageError) {
            console.error("Error eliminando del storage:", storageError);
            return;
        }

        // 3️⃣ Eliminar del array local
        const updatedImages = product.images.filter(
            (img) => img !== imageUrl
        );

        // 4️⃣ Actualizar en la base
        const { error } = await supabase
            .from("products")
            .update({ images: updatedImages })
            .eq("id", id);

        if (!error) {
            setProduct({ ...product, images: updatedImages });
        }
    };

    return (
        <div className="min-h-screen bg-[#e6e0cf] py-10 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">

                {/* Back */}
                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 text-[#baa6a5] hover:text-[#5297ac] mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al panel
                </button>

                <h1
                    className="text-3xl text-[#5297ac] font-light mb-8"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                    Editar Producto
                </h1>

                <form onSubmit={handleUpdate} className="space-y-6">

                    <Input label="Nombre" name="name" value={product.name} onChange={handleChange} />
                    <Input label="Precio" name="price" type="number" value={product.price} onChange={handleChange} />
                    <Input label="Stock" name="stock" type="number" value={product.stock} onChange={handleChange} />

                    <div>
                        <label className="block text-sm text-[#3a3a3a]/70 mb-2">
                            Categoría
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={product.category || ""}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-xl border border-[#e6e0cf] focus:border-[#5297ac] focus:ring-2 focus:ring-[#5297ac]/30 outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-[#3a3a3a]/70 mb-3">
                            Imágenes actuales
                        </label>

                        <div className="mt-4">
                            <label className="block text-sm text-[#3a3a3a]/70 mb-2">
                                Agregar nueva imagen
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setNewImages(Array.from(e.target.files))}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {product.images?.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={img}
                                        alt="Producto"
                                        className="w-28 h-28 object-cover rounded-xl"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(img)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-[#3a3a3a]/70 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={product.description || ""}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border border-[#e6e0cf] focus:border-[#5297ac] focus:ring-2 focus:ring-[#5297ac]/30 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={product.featured || false}
                            onChange={(e) =>
                                setProduct({ ...product, featured: e.target.checked })
                            }
                            className="w-4 h-4 accent-[#5297ac]"
                        />
                        <span className="text-sm text-[#3a3a3a]/70">
                            Producto destacado
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full h-12 rounded-xl bg-[#5297ac] hover:bg-[#5297ac]/90 text-white flex items-center justify-center gap-2 transition-all"
                    >
                        {isSaving ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Guardar Cambios
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}

/* ---------- Reusable Input ---------- */

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm text-[#3a3a3a]/70 mb-2">
                {label}
            </label>
            <input
                {...props}
                className="w-full h-12 px-4 rounded-xl border border-[#e6e0cf] focus:border-[#5297ac] focus:ring-2 focus:ring-[#5297ac]/30 outline-none"
            />
        </div>
    );
}