import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        image: "",
        description: "",
        category: ""
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrls = [];

        if (selectedFiles.length > 0) {
            for (const file of selectedFiles) {
                const fileName = `${Date.now()}-${file.name}`;

                const { error: uploadError } = await supabase.storage
                    .from("products")
                    .upload(fileName, file);

                if (uploadError) {
                    console.error("Error subiendo:", uploadError);
                    continue; // sigue con las otras imágenes
                }

                const { data } = supabase.storage
                    .from("products")
                    .getPublicUrl(fileName);

                imageUrls.push(data.publicUrl);
            }
        }

        // 2️⃣ Insertar producto
        const productData = {
            name: form.name,
            price: Number(form.price),
            stock: Number(form.stock),
            description: form.description || null,
            category: form.category || null,
            images: imageUrls, 
        };

        const { error } = await supabase
            .from("products")
            .insert([productData]);

        if (error) {
            console.error(error);
            alert(error.message);
        } else {
            navigate("/admin");
        }
    };

    return (
        <div className="min-h-screen bg-[#e6e0cf] flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-6 text-[#5297ac]">
                    Nuevo Producto
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    <input
                        name="price"
                        placeholder="Precio"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    <input
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setSelectedFiles([...e.target.files])}
                        className="w-full p-3 border rounded-lg"
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    <input
                        name="category"
                        placeholder="Categoría"
                        value={form.category || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#5297ac] text-white py-3 rounded-lg hover:bg-[#5297ac]/80"
                    >
                        Crear Producto
                    </button>

                </form>
            </div>
        </div>
    );
}