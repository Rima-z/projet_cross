import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getPool } from './db.js';
import { requireAuth } from './auth.js';

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

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        name: z.string().min(1),
        unitPrice: z.number().int().nonnegative(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});

app.post('/orders', requireAuth, async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data' });

  const userId = req.userId;
  const items = parsed.data.items;
  const total = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [orderResult] = await conn.execute(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, total],
    );
    const orderId = orderResult.insertId;

    for (const it of items) {
      const lineTotal = it.unitPrice * it.quantity;
      await conn.execute(
        'INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, it.productId, it.name, it.unitPrice, it.quantity, lineTotal],
      );
    }

    await conn.commit();
    return res.json({ orderId: String(orderId), total });
  } catch {
    await conn.rollback();
    return res.status(500).json({ message: 'Failed to create order' });
  } finally {
    conn.release();
  }
});

// Favorites endpoints
app.get('/favorites', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT product_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
      [userId],
    );
    const productIds = rows.map((row) => row.product_id);
    return res.json({ favorites: productIds });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

const addFavoriteSchema = z.object({
  productId: z.string().min(1),
});

app.post('/favorites', requireAuth, async (req, res) => {
  const parsed = addFavoriteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data' });

  try {
    const userId = req.userId;
    const { productId } = parsed.data;
    const pool = getPool();

    // Vérifier si le favori existe déjà
    const [existing] = await pool.execute(
      'SELECT id FROM favorites WHERE user_id = ? AND product_id = ? LIMIT 1',
      [userId, productId],
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Favorite already exists' });
    }

    await pool.execute('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)', [
      userId,
      productId,
    ]);

    return res.json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return res.status(500).json({ message: 'Failed to add favorite' });
  }
});

app.delete('/favorites/:productId', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const pool = getPool();

    const [result] = await pool.execute(
      'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
      [userId, productId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    return res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Failed to remove favorite' });
  }
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});



