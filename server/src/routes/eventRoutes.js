const {
     createEvent,
     updateEvent,
     duplicateEvent,
     sortEvents,
     getEvents,
     deleteEvent
  } = require('../controllers/event/eventController');
  
const { authenticate } = require('../middlewares/auth/authenticate');
const checkAdminOrSuperAdmin = require('../middlewares/auth/checkAdminOrSuperAdmin');
const upload = require('../middlewares/upload');
const runValidation = require('../validators');
const { validateEventFields } = require('../validators/events/eventsValidate');

const router = require('express').Router();

router.get('/', authenticate , checkAdminOrSuperAdmin ,getEvents);
router.post('/', authenticate,checkAdminOrSuperAdmin, upload.single('image'), validateEventFields , runValidation ,createEvent);
router.put('/:eventId', authenticate , checkAdminOrSuperAdmin , upload.single('image'),validateEventFields , runValidation , updateEvent);
router.delete('/:eventId', authenticate , checkAdminOrSuperAdmin , deleteEvent);
router.post('/:eventId/duplicate' , authenticate ,checkAdminOrSuperAdmin , duplicateEvent);
router.get('/sort', authenticate , checkAdminOrSuperAdmin ,sortEvents);


module.exports = router;