import { Router } from 'express';
import { versionController } from '../controllers/version.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/branches', versionController.createBranch);
router.get('/branches/:curriculumId', versionController.getBranches);
router.get('/commits/:curriculumId', versionController.getCommits);
router.post('/commits', versionController.createCommit);
router.post('/merge-requests', versionController.createMergeRequest);
router.get('/merge-requests/:curriculumId', versionController.getMergeRequests);
router.post('/merge-requests/:mrId/merge', versionController.mergeRequest);
router.post('/rollback', versionController.rollback);

export default router;
