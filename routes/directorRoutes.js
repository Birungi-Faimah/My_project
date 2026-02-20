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

// CSV Export route for company-wide data (Director only)
router.get("/exportCompany", requireRole('director'), async (req, res) => {
    try {
        const [produces, sales, credits] = await Promise.all([
            Produce.find().sort({ createdAt: -1 }),
            Sale.find().sort({ createdAt: -1 }),
            Credit.find().sort({ createdAt: -1 })
        ]);
        
        // Create CSV header
        let csv = 'KARIBU GROCERIES LTD - COMPANY REPORT\n';
        csv += `Generated: ${new Date().toLocaleString()}\n\n`;
        
        // Company Summary
        const totalProcured = produces.reduce((sum, p) => sum + (p.tonnage || 0), 0);
        const totalSold = sales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0);
        const totalRevenue = sales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
        const totalCredit = credits.reduce((sum, c) => sum + (c.amountDue || 0), 0);
        
        csv += 'COMPANY SUMMARY\n';
        csv += `Total Procured,${totalProcured},kg\n`;
        csv += `Total Sold,${totalSold},kg\n`;
        csv += `Current Stock,${totalProcured - totalSold},kg\n`;
        csv += `Total Revenue,${totalRevenue},UGX\n`;
        csv += `Total Credit,${totalCredit},UGX\n\n`;
        
        // Branch Summary
        csv += 'BRANCH SUMMARY\n';
        csv += 'Branch,Total Procured (kg),Current Stock (kg),Total Revenue (UGX),Sales Count\n';
        
        const branches = ['Maganjo', 'Matugga'];
        branches.forEach(branch => {
            const branchProduces = produces.filter(p => p.branch === branch);
            const branchSales = sales.filter(s => s.branch === branch);
            const procured = branchProduces.reduce((sum, p) => sum + (p.tonnage || 0), 0);
            const sold = branchSales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0);
            const revenue = branchSales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
            csv += `${branch},${procured},${procured - sold},${revenue},${branchSales.length}\n`;
        });
        
        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="company_report.csv"');
        res.send(csv);
    } catch (error) {
        console.error('Error exporting company data:', error);
        res.status(500).send('Error exporting company data');
    }
});

module.exports = router;