const { superAdminRegisterController } = require('../../controllers/user/authController');
 
const {  
    getSingleEntity,
    getAllEntities,
    updateSingleEntity,
    superAdminBlockUnblock,
    superAdminDelete,
    getSuperAdminProfile,
    updateSuperAdminProfile,
    resetSuperAdminPassword,
    updateSuperAdminProfileImage
 } = require('../../controllers/user/userController');
 
const { authenticate } = require('../../middlewares/auth/authenticate');
const authorizeSuperAdmin = require('../../middlewares/auth/authorizeSuperAdmin');
const upload = require('../../middlewares/upload');

const router = require('express').Router();
   
router.post('/entities', authenticate, authorizeSuperAdmin, superAdminRegisterController);
router.get('/entities', authenticate, authorizeSuperAdmin, getAllEntities);
router.get('/entities/:entityId', authenticate, authorizeSuperAdmin, getSingleEntity);
router.put('/entities/:entityId', authenticate, authorizeSuperAdmin, updateSingleEntity);
router.patch('/entities/:entityId', authenticate, authorizeSuperAdmin, superAdminBlockUnblock);
router.delete('/entities/:entityId', authenticate, authorizeSuperAdmin, superAdminDelete);
router.get('/profile', authenticate , authorizeSuperAdmin , getSuperAdminProfile);
router.put('/profile', authenticate , authorizeSuperAdmin ,  updateSuperAdminProfile);
router.put('/reset-password', authenticate, authorizeSuperAdmin, resetSuperAdminPassword);  
router.patch('/upload-profile-image', authenticate, authorizeSuperAdmin , upload.single('image') , updateSuperAdminProfileImage);  



module.exports = router;