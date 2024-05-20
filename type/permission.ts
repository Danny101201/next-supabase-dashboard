export type Member = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};
export type Permission = {
  id: string;
  created_at: string;
  role: string;
  status: string;
  member_id: string;
  members: Member;
}
