import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Credenciales incorrectas");
      setIsLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(135deg, #e6e0cf 0%, #a6c6c1 100%)"
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

        {/* Title */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-light text-[#5297ac]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Panel Administrativo
          </h1>
          <p className="text-[#baa6a5] text-sm mt-2">
            Ingresá para gestionar productos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm text-[#3a3a3a]/70 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-[#e6e0cf] focus:border-[#5297ac] focus:ring-2 focus:ring-[#5297ac]/30 outline-none transition-all"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-[#3a3a3a]/70 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-[#e6e0cf] focus:border-[#5297ac] focus:ring-2 focus:ring-[#5297ac]/30 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-500 text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 text-white transition-all ${
              isLoading
                ? "bg-[#baa6a5]"
                : "bg-[#5297ac] hover:bg-[#5297ac]/90"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Ingresar
              </>
            )}
          </button>

        </form>

        {/* Decorative line */}
        <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-[#debfb5] via-[#a6c6c1] to-[#5297ac]" />

      </div>
    </div>
  );
}