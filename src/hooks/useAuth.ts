import { authService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export function useAuth() {
  const login = useMutation({
    mutationFn: authService.login,
  });

  const logout = useMutation({
    mutationFn: authService.logout,
  });

  return { login, logout };
}
