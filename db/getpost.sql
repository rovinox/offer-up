SELECT * FROM sell_item
JOIN users ON users.user_id = sell_item.user_id 
WHERE users.user_id = $1 ;