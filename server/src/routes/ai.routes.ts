import { Router } from 'express';
import { aiController, nepController } from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/generate-syllabus', aiController.generateSyllabus);
router.post('/rewrite', aiController.rewriteContent);
router.post('/nep-audit', nepController.runAudit);

export default router;
