const express = require('express');
const router = express.Router();
const Produce = require('../models/Produce');
const Sale = require('../models/Sale');
const Credit = require('../models/Credit');
const requireRole = require('../middleware/roleCheck');

// Director Dashboard - Aggregated View Only (All Branches)
router.get("/director", requireRole('director'), async (req, res) => {
    try {
        // Fetch all data from all branches
        const [produces, sales, credits] = await Promise.all([
            Produce.find().sort({ createdAt: -1 }),
            Sale.find().sort({ saleDate: -1 }),
            Credit.find().sort({ createdAt: -1 })
        ]);

        // Calculate totals per branch
        const branchStats = {};
        const branches = ['Maganjo', 'Matugga'];

        branches.forEach(branch => {
            const branchProduces = produces.filter(p => p.branch === branch);
            const branchSales = sales.filter(s => s.branch === branch);
            const branchCredits = credits.filter(c => c.branch === branch);

            const totalProcured = branchProduces.reduce((sum, p) => sum + (p.tonnage || 0), 0);
            const totalSold = branchSales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0);
            const totalSalesAmount = branchSales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
            const totalCredit = branchCredits.reduce((sum, c) => sum + (c.amountDue || 0), 0);
            const pendingCredits = branchCredits.filter(c => c.status === 'pending').length;

            branchStats[branch] = {
                totalProcured,
                currentStock: totalProcured - totalSold,
                totalSalesAmount,
                totalSalesCount: branchSales.length,
                totalCredit,
                pendingCredits,
                procurementsCount: branchProduces.length
            };
        });

        // Calculate company-wide totals
        const companyStats = {
            totalProcured: produces.reduce((sum, p) => sum + (p.tonnage || 0), 0),
            totalSold: sales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0),
            totalSalesAmount: sales.reduce((sum, s) => sum + (s.amountPaid || 0), 0),
            totalCredit: credits.reduce((sum, c) => sum + (c.amountDue || 0), 0),
            totalSalesCount: sales.length,
            totalProcurements: produces.length,
            pendingCredits: credits.filter(c => c.status === 'pending').length
        };

        // Produce type breakdown
        const produceTypes = ['Beans', 'Grain Maize', 'Cow Peas', 'G-nuts', 'Soybeans'];
        const produceStats = {};
        
        produceTypes.forEach(type => {
            const typeProduces = produces.filter(p => 
                p.produceType && p.produceType.toLowerCase().includes(type.toLowerCase())
            );
            const typeSales = sales.filter(s => 
                s.produceType && s.produceType.toLowerCase().includes(type.toLowerCase())
            );
            
            produceStats[type] = {
                procured: typeProduces.reduce((sum, p) => sum + (p.tonnage || 0), 0),
                sold: typeSales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0),
                revenue: typeSales.reduce((sum, s) => sum + (s.amountPaid || 0), 0)
            };
        });

        res.render("director", { 
            branchStats,
            companyStats,
            produceStats,
            user: req.user
        });
    } catch (error) {
        console.error('Director dashboard error:', error);
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;