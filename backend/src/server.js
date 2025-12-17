import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getPool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/auth/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data' });

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  const pool = getPool();
  const [rows] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [normalizedEmail]);
  if (rows.length > 0) return res.status(409).json({ message: 'Email already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name.trim(), normalizedEmail, passwordHash],
  );

  const user = { id: String(result.insertId), name: name.trim(), email: normalizedEmail };
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ user, token });
});

app.post('/auth/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data' });

  const { email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  const pool = getPool();
  const [rows] = await pool.execute(
    'SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1',
    [normalizedEmail],
  );
  if (rows.length === 0) return res.status(401).json({ message: 'Account not found' });

  const row = rows[0];
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return res.status(401).json({ message: 'Wrong password' });

  const user = { id: String(row.id), name: row.name, email: row.email };
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ user, token });
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


