-- =========================================================================
-- NOVERE  ·  Promote a user to admin role
-- Use after the user has registered at /register.
-- Replace the email below with the target user's email and run.
-- =========================================================================

update public.profiles
   set role = 'admin'
 where id = (
   select id from auth.users where email = 'a8485830@gmail.com'
 );

-- Verify:
-- select id, full_name, role from public.profiles where role = 'admin';
