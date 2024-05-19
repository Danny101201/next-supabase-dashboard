export type Member = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};
export type Permission = {
  id: string;
  created_at: string;
  role: "user" | "admin";
  status: "active" | "unActive";
  member_id: string;
  members: Member;
}
