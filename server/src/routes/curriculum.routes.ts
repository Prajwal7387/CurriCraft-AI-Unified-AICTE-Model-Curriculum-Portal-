import { Router } from 'express';
import { curriculumController } from '../controllers/curriculum.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requirePermissions } from '../middleware/rbac.middleware';
import { Permission } from '../constants/permissions';

const router = Router();

router.use(authenticate);

router.post('/', requirePermissions(Permission.CURRICULUM_CREATE), curriculumController.create);
router.get('/', curriculumController.getAll);
router.get('/:id', curriculumController.getById);
router.put('/:id', requirePermissions(Permission.CURRICULUM_UPDATE), curriculumController.update);
router.patch('/:id/status', requirePermissions(Permission.CURRICULUM_APPROVE), curriculumController.updateStatus);

export default router;
