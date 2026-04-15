// ==========================================
// AI Racing Manager — Admin Configuration
// ==========================================

/** Super admin email — full system access, account impersonation */
export const SUPER_ADMIN_EMAILS = [
  "loseyp@gmail.com",
];

/** AI agent account — the house team controller */
export const AGENT_EMAIL = "agent@airacing.gg";
export const AGENT_DISPLAY_NAME = "AI Racing";

/** Check if an email has super admin privileges */
export function isSuperAdmin(email: string): boolean {
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase());
}

/** Check if an email is the AI agent account */
export function isAgentAccount(email: string): boolean {
  return email.toLowerCase() === AGENT_EMAIL.toLowerCase();
}

/** Get the role for a given email */
export function getRoleForEmail(email: string): "superadmin" | "admin" | "player" {
  if (isSuperAdmin(email)) return "superadmin";
  if (isAgentAccount(email)) return "admin";
  return "player";
}
