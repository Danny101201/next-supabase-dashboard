export type Permission = {
  id: string;
  created_at: string;
  role: "user" | "admin";
  status: "active" | "unActive";
  member_id: string;
  members: {
    id: string;
    name: string;
    created_at: string;
  };
}
