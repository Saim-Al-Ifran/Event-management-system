const { getSettings, createOrUpdateSettings } = require('../controllers/settings/settingsController');
const upload = require('../middlewares/upload');

const router  = require('express').Router();

router.get('/',getSettings);
router.post('/',upload.single('image'),createOrUpdateSettings)


module.exports = router;