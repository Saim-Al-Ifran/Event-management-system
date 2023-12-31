const router = require('express').Router();
const adminPanelAuth = require('./adminPanelAuthRoutes');
const superAdminRoutes = require('./roleRoutes/superAdminRoutes');
const adminRoutes = require('./roleRoutes/adminRoutes');

router.use('/api/v1/event-administration',adminPanelAuth);
router.use('/api/v1/event-administration',superAdminRoutes);
router.use('/api/v1/event-administration/admin',adminRoutes);
 

module.exports = router;

