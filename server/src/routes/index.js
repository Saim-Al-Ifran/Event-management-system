const router = require('express').Router();
const adminPanelAuth = require('./adminPanelAuthRoutes');
const superAdminRoutes = require('./roleRoutes/superAdminRoutes');
const adminRoutes = require('./roleRoutes/adminRoutes');
const categoryRoutes = require('./categoryRoutes')
const eventRoutes = require('./eventRoutes');

router.use('/api/v1/event-administration',adminPanelAuth);
router.use('/api/v1/event-administration',superAdminRoutes);
router.use('/api/v1/event-administration/admin',adminRoutes);
router.use('/api/v1/event-administration/categories',categoryRoutes);
router.use('/api/v1/event-administration/events', eventRoutes);
 

module.exports = router;

