CREATE OR REPLACE FUNCTION public.update_user_role(
    user_id uuid,
    new_role text
) RETURNS void AS $$
BEGIN
    UPDATE auth.users
    SET role = new_role
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;


SELECT public.update_user_role('4eba8299-a00b-4ec1-b0ec-e93b354456f3','admin')
