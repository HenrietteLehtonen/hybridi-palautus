import express from 'express';
import {
  commentListGet,
  commentListByMediaIdGet,
  commentListByUserGet,
  commentCountByMediaIdGet,
  commentGet,
  commentPost,
  commentPut,
  commentDelete,
} from '../controllers/commentController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @api {get} /comments Get all comments
 * @apiName GetComments
 * @apiGroup Comments
 * @apiSuccess {Object[]} comments List of comments.
 * @apiSuccess {Number} comments.comment_id Comment ID.
 * @apiSuccess {String} comments.comment_text Comment text.
 * @apiSuccess {Number} comments.media_id Media ID.
 * @apiSuccess {Number} comments.user_id User ID.
 * @apiSuccess {String} comments.created_at Creation date.
 */
router.route('/').get(commentListGet);

router
  .route('/')
  .post(
    authenticate,
    body('comment_text')
      .trim()
      .notEmpty()
      .withMessage('Comment text is required'),
    body('media_id')
      .isInt({min: 1})
      .toInt()
      .withMessage('Media ID must be a positive integer'),
    validationErrors,
    commentPost,
  );

router
  .route('/bymedia/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    commentListByMediaIdGet,
  );

router
  .route('/user/:user_id')
  .get(
    param('user_id')
      .isInt({min: 1})
      .toInt()
      .withMessage('User ID must be a positive integer'),
    validationErrors,
    commentListByUserGet,
  );

router
  .route('/count/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    commentCountByMediaIdGet,
  );

router
  .route('/:comment_id')
  .get(
    param('comment_id')
      .isInt({min: 1})
      .toInt()
      .withMessage('Comment ID must be a positive integer'),
    validationErrors,
    commentGet,
  );

router
  .route('/:comment_id')
  .put(
    authenticate,
    param('comment_id')
      .isInt({min: 1})
      .toInt()
      .withMessage('Comment ID must be a positive integer'),
    body('comment_text')
      .trim()
      .notEmpty()
      .withMessage('Comment text is required'),
    validationErrors,
    commentPut,
  );

router
  .route('/:comment_id')
  .delete(
    authenticate,
    param('comment_id')
      .isInt({min: 1})
      .toInt()
      .withMessage('Comment ID must be a positive integer'),
    validationErrors,
    commentDelete,
  );

export default router;
