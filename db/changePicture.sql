UPDATE users SET image = $1 WHERE user_id = $2
returning * ;
