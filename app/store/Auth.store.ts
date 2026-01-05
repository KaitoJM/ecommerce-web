import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Customer } from "~/types/User.type";
import { $fetch, type FetchError } from "ofetch";
import type { ApiError } from "~/types/ApiResponses.type";

interface LoginResponse {
  user: Customer;
  token: string;
}

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const user = ref<Customer | null>(null);
  const token = ref<string | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  const hydrate = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        user.value = JSON.parse(storedUser);
        token.value = storedToken;
      } catch (e) {
        console.warn("Failed to parse user from localStorage:", e);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await $fetch<LoginResponse>(
        `${config.public.apiBase}/site/login`,
        {
          method: "POST",
          body: { email, password },
        }
      );

      token.value = res.token;
      user.value = res.user;

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
    } catch (error) {
      const err = error as FetchError<any>;

      throw {
        message: err.data?.message ?? "Login failed",
        errors: err.data?.errors,
        statusCode: err.status,
      } as ApiError;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.clear();
  };

  return {
    user,
    token,
    isLoggedIn,
    hydrate,
    login,
    logout,
  };
});
