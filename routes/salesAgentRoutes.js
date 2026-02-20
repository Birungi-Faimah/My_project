const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Credit = require('../models/Credit');
const requireRole = require('../middleware/roleCheck');

// Sales Agent Dashboard
router.get("/salesAgentDash", requireRole('salesagent'), async (req, res) => {
    try {
        // Get the logged-in sales agent's name
        const agentName = `${req.user.firstname} ${req.user.lastname}`;
        const userBranch = req.user.branch;
        
        // Fetch sales and credits for this agent only
        const [sales, credits] = await Promise.all([
            Sale.find({ salesAgentName: { $regex: new RegExp(req.user.firstname, 'i') } })
                .sort({ createdAt: -1 })
                .limit(10),
            Credit.find({ salesAgentName: { $regex: new RegExp(req.user.firstname, 'i') } })
                .sort({ createdAt: -1 })
        ]);
        
        // Calculate statistics for this agent
        const allAgentSales = await Sale.find({ salesAgentName: { $regex: new RegExp(req.user.firstname, 'i') } });
        const totalSales = allAgentSales.length;
        const totalRevenue = allAgentSales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
        const totalTonnage = allAgentSales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0);
        
        // Credit statistics
        const totalCredits = credits.length;
        const pendingCredits = credits.filter(c => c.status === 'pending');
        const pendingCreditsCount = pendingCredits.length;
        
        res.render("salesAgentDash", { 
            user: req.user,
            branch: userBranch,
            stats: {
                totalSales,
                totalRevenue,
                totalTonnage,
                totalCredits,
                pendingCredits: pendingCreditsCount
            },
            recentSales: sales.slice(0, 5),
            pendingCredits: pendingCredits.slice(0, 5),
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        console.error('Sales Agent dashboard error:', error);
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;
