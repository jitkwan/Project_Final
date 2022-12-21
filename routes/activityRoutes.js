import express from 'express'
import { createActivity, getAllActivities, updateActivity, deleteActivity, showStats } from '../controllers/activityController.js'
const router = express.Router()



router.route('/').post(createActivity).get(getAllActivities)
// remember about id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteActivity).patch(updateActivity)

export default router