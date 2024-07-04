create TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL
)

SELECT * FROM players

INSERT INTO players (name, score) VALUES ($1, $2) RETURNING *

UPDATE players
SET score = $3
WHERE id = $4

DELETE FROM players
WHERE id = $5
SELECT * FROM players

-- Example usage--
INSERT INTO players (name, score) VALUES ('John Doe', 100) RET
