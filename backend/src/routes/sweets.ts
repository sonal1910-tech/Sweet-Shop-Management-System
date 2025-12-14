import { Router } from 'express';
import { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } from '../controllers/sweetController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public? No, prompt says Protected.
// But usually Search/View is public. The prompt says: "Sweets (Protected) ... GET /api/sweets".
// So I will protect ALL of them.

router.get('/search', authenticateToken, searchSweets); // /search before /:id usually
router.get('/', authenticateToken, getSweets);
router.post('/', authenticateToken, isAdmin, addSweet); // Admin only for add
router.put('/:id', authenticateToken, isAdmin, updateSweet); // Admin only for update
router.delete('/:id', authenticateToken, isAdmin, deleteSweet); // Admin only

// Inventory
router.post('/:id/purchase', authenticateToken, purchaseSweet);
router.post('/:id/restock', authenticateToken, isAdmin, restockSweet);

export default router;
