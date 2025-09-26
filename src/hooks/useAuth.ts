import { authService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export function useAuth() {
  const login = useMutation({
    mutationFn: authService.login,
  });

  const logout = useMutation({
    mutationFn: authService.logout,
  });

  const forgotPassword = useMutation({
    mutationFn: authService.forgotPassword,
  });

  const resetPassword = useMutation({
    mutationFn: authService.resetPassword,
  });

  return { login, logout, forgotPassword, resetPassword };
}
