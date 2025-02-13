<template>
  <div class="flex justify-center items-center min-h-screen bg-base-200">
    <div class="w-[600px] bg-base-100 shadow-xl">
      <div class="m-8 flex flex-col">
        <h2 class="text-xl text-title text-center pb-6 border-b-2 border-primary">
          Личный кабинет
        </h2>

        <!-- Загрузка данных -->
        <div v-if="loading" class="text-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Ошибка -->
        <div v-else-if="error" class="text-center text-red-500">Ошибка: {{ error }}</div>

        <!-- Данные пользователя -->
        <div class="flex gap-x-8 my-6">
          <div class="flex flex-1 flex-col gap-4 my-auto">
            <span class="font-bold py-2 border-b-2 border-primary">Email:</span>
            <span class="font-bold py-2 border-b-2 border-primary">Полное имя:</span>
            <span class="font-bold py-2 border-b-2 border-primary"
              >Имя пользователя:</span
            >
            <span class="font-bold py-2 border-b-2 border-primary">Возраст:</span>
            <span class="font-bold py-2 border-b-2 border-primary">Страна:</span>
          </div>

          <div class="flex flex-1 flex-col gap-4">
            <span class="p-2 border-2 border-primary rounded-xl">{{ user.email }}</span>
            <span class="p-2 border-2 border-primary rounded-xl">{{
              user.fullname
            }}</span>
            <span class="p-2 border-2 border-primary rounded-xl">{{
              user.username
            }}</span>
            <span class="p-2 border-2 border-primary rounded-xl">{{ user.age }}</span>
            <span class="p-2 border-2 border-primary rounded-xl">{{ user.country }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const user = ref(null);
const loading = ref(true);
const error = ref("");
user.value = {
  email: "user@example.com",
  fullname: "Иван Иванов",
  username: "ivan_ivanov",
  age: 25,
  country: "Россия",
};

const fetchUserData = async () => {
  try {
    loading.value = true;
    const response = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    user.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserData);
</script>
