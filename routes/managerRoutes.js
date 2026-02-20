const express = require('express');
const router = express.Router();
const Produce = require('../models/Produce');
const Sale = require('../models/Sale');
const Credit = require('../models/Credit');
const requireRole = require('../middleware/roleCheck');

// Manager Dashboard - Comprehensive Overview
router.get("/manager", requireRole('manager'), async (req, res) => {
    try {
        // Get user's branch (manager can only see their branch data)
        const userBranch = req.user.branch;
        
        // Fetch all data in parallel for better performance
        const [produces, sales, credits, lowStockItems] = await Promise.all([
            // All produce for the manager's branch
            Produce.find({ branch: userBranch }).sort({ createdAt: -1 }),
            // All sales for the manager's branch
            Sale.find({ branch: userBranch }).sort({ saleDate: -1 }),
            // All credit records for the manager's branch
            Credit.find({ branch: userBranch }).sort({ createdAt: -1 }),
            // Low stock items (less than 100kg)
            Produce.find({ branch: userBranch, tonnage: { $lt: 100 } }).sort({ tonnage: 1 })
        ]);

        // Calculate statistics
        const totalProcured = produces.reduce((sum, p) => sum + (p.tonnage || 0), 0);
        const totalSales = sales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
        const totalCredit = credits.reduce((sum, c) => sum + (c.amountDue || 0), 0);
        const pendingCredits = credits.filter(c => c.status === 'pending').length;
        
        // Calculate current stock (procured - sold)
        const totalSold = sales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0);
        const currentStock = totalProcured - totalSold;

        // Recent activities (last 5 of each)
        const recentSales = sales.slice(0, 5);
        const recentCredits = credits.slice(0, 5);

        res.render("manager", { 
            produces,
            sales: recentSales,
            credits: recentCredits,
            lowStockItems,
            stats: {
                totalProcured,
                totalSales,
                totalCredit,
                pendingCredits,
                currentStock,
                totalSalesCount: sales.length,
                totalProcurementsCount: produces.length
            },
            branch: userBranch,
            user: req.user
        });
    } catch (error) {
        console.error('Manager dashboard error:', error);
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;