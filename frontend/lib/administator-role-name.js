export function administatorRoleName(role) {
  switch (role) {
    case "admin":
      return "Admin";
    case "moderator":
      return "Moderator";
    default:
      return "User";
  }
}
