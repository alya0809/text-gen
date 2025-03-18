import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

export const logout = () => {
    toast.warning($t("session"));
    // Удаляем токен из localStorage
    localStorage.removeItem("token");
  
    // Перенаправляем на страницу входа
    router.push("/signin");
  };