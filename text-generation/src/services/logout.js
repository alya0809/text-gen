import { useRouter } from "vue-router";
const router = useRouter(); // Используем Vue Router для перенаправления

export const logout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("token");
  
    // Перенаправляем на страницу входа
    router.push("/signin");
  };