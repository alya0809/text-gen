<template>
  <div class="flex justify-center items-center py-6">
    <div class="w-full max-w-md shadow-xl border border-primary rounded-lg">
      <div class="px-6 py-8">
        <!-- Навигация между Sign Up и Sign In -->
        <div class="tabs tabs-boxed mb-4">
          <router-link
            to="/signup"
            class="tab"
            :class="{ 'tab-active': $route.path === '/signup' }"
          >
            Sign up
          </router-link>
          <router-link
            to="/signin"
            class="tab"
            :class="{ 'tab-active': $route.path === '/signin' }"
          >
            Sign in
          </router-link>
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="alert alert-warning shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M12 12h.01M12 16v.01"
              />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Поля ввода -->
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text"><span class="text-error">*</span> Login</span>
          </label>
          <input
            type="text"
            placeholder="Input login"
            class="input input-bordered input-primary w-full"
            v-model="email"
          />
        </div>
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text"><span class="text-error">*</span> Username</span>
          </label>
          <input
            type="text"
            placeholder="Input username"
            class="input input-bordered input-primary w-full"
            v-model="username"
          />
        </div>
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text"><span class="text-error">*</span> Password</span>
          </label>
          <input
            type="password"
            placeholder="Input password"
            class="input input-bordered input-primary w-full"
            v-model="password"
          />
        </div>
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text">
              <span class="text-error">*</span> Password confirmation
            </span>
          </label>
          <input
            type="password"
            placeholder="Input password again"
            class="input input-bordered input-primary w-full"
            v-model="confirmPassword"
          />
        </div>

        <!-- Ошибка пароля -->
        <div v-if="passwordError" class="alert alert-error shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{{ passwordError }}</span>
          </div>
        </div>

        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text"><span class="text-error">*</span> Fullname</span>
          </label>
          <input
            type="text"
            placeholder="Input fullname"
            class="input input-bordered input-primary w-full"
            v-model="fullname"
          />
        </div>

        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text"><span class="text-error">*</span> Country</span>
          </label>
          <input
            type="text"
            placeholder="Input countries"
            class="input input-bordered input-primary w-full"
            v-model="country"
          />
        </div>

        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text"><span class="text-error">*</span> Age</span>
          </label>
          <input
            type="number"
            placeholder="Input age"
            class="input input-bordered input-primary w-full"
            v-model="age"
          />
        </div>

        <!-- Кнопка регистрации или входа -->
        <div class="form-control mt-4">
          <Loader v-if="loading" />
          <button v-else class="btn btn-primary w-full" @click="registerUser">
            {{ $route.path === "/signup" ? "Sign up" : "Sign in" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "../src/components/myLoader.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const error = ref("");
const fullname = ref("");
const username = ref("");
const country = ref("");
const loading = ref(false);
const age = ref();

const BASE_URL = import.meta.env.VITE_BASE_URL;

const registerUser = async () => {
  passwordError.value = "";
  error.value = "";

  if (password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match";
    return;
  }
  const data = {
    email: email.value,
    password: password.value,
    username: username.value,
    fullname: fullname.value,
    country: country.value,
    age: age.value,
  };

  try {
    loading.value = true;
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Ошибка регистрации");
    }

    // Перенаправление после успешной регистрации
    router.push("/");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
