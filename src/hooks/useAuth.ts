import { authService } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const login = useMutation({
    mutationFn: authService.login,
  });

  const logout = useMutation({
    mutationFn: authService.logout,
  });

  return { login, logout };
}
