const router = require('express').Router();
const authorizeAdmin = require('../../middlewares/auth/authorizeAdmin');
const { authenticate } = require('../../middlewares/auth/authenticate'); 
const { 
    adminGetAllUsers,
    adminUpdateUser,
    adminCreateUser,
    adminGetSingleUser,
    adminDeleteUser, 
    adminBlockUnblockUser,
    getAdminProfile,
    updateAdminProfile,
    resetAdminPassword
} = require('../../controllers/user/userController');


router.get('/users', authenticate, authorizeAdmin, adminGetAllUsers);
router.get('/users/:userId', authenticate, authorizeAdmin, adminGetSingleUser);
router.put('/users/:userId', authenticate, authorizeAdmin, adminUpdateUser);
router.post('/users', authenticate, authorizeAdmin, adminCreateUser);
router.delete('/users/:userId', authenticate, authorizeAdmin, adminDeleteUser);
router.patch('/users/:userId/blockunblock',  authenticate , authorizeAdmin, adminBlockUnblockUser);
router.get('/profile', authenticate, authorizeAdmin, getAdminProfile);
router.put('/profile', authenticate, authorizeAdmin, updateAdminProfile);
router.put('/reset-password', authenticate, authorizeAdmin, resetAdminPassword); 
 
module.exports = router;