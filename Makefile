# https://supabase.com/docs/guides/api/rest/generating-types
SB=supabase
file:
	@mkdir utils
	@touch database.types.ts
login:
	${SB} login
init:
	${SB} init
link:
	${SB} link
db-type:
	${SB} gen types typescript --linked --schema=public > utils/database.types.ts
