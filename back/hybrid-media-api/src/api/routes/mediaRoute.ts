import express from 'express';
import {
  mediaListGet,
  mediaGet,
  mediaPost,
  mediaPut,
  mediaDelete,
  mediaByUserGet,
  mediaListMostLikedGet,
} from '../controllers/mediaController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param, query} from 'express-validator';

const router = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @api {get} /media Get all media items
 * @apiName GetMediaList
 * @apiGroup Media
 * @apiParam {Number} [page] Page number for pagination.
 * @apiParam {Number} [limit] Number of items per page.
 * @apiSuccess {Object[]} media List of media items.
 */
router
  .route('/')
  .get(
    query('page').optional().isInt({min: 1}).toInt(),
    query('limit').optional().isInt({min: 1}).toInt(),
    validationErrors,
    mediaListGet,
  )
  /**
   * @api {post} /media Create a new media item
   * @apiName CreateMedia
   * @apiGroup Media
   * @apiHeader {String} Authorization Bearer token.
   * @apiBody {String} title Title of the media item.
   * @apiBody {String} description Description of the media item.
   * @apiBody {String} filename Filename of the media item.
   * @apiBody {String} media_type MIME type of the media item.
   * @apiBody {Number} filesize Size of the media item in bytes.
   * @apiSuccess {Object} media Created media item.
   * @apiError {String} 400 Invalid input.
   */
  .post(
    authenticate,
    body('title')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 128})
      .escape(),
    body('description')
      .trim()
      .notEmpty()
      .isString()
      .isLength({max: 1000})
      .escape(),
    body('filename')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[\w.-]+$/)
      .escape(),
    body('media_type').trim().notEmpty().isMimeType(),
    body('filesize').notEmpty().isInt({min: 1}).toInt(),
    validationErrors,
    mediaPost,
  );

/**
 * @api {get} /media/mostliked Get most liked media items
 * @apiName GetMostLikedMedia
 * @apiGroup Media
 * @apiSuccess {Object[]} media List of most liked media items.
 */
router.route('/mostliked').get(mediaListMostLikedGet);

/**
 * @api {get} /media/:id Get a media item by ID
 * @apiName GetMediaById
 * @apiGroup Media
 * @apiParam {Number} id Media item ID.
 * @apiSuccess {Object} media Media item details.
 */
router
  .route('/:id')
  .get(param('id').isInt({min: 1}).toInt(), validationErrors, mediaGet)
  /**
   * @api {put} /media/:id Update a media item
   * @apiName UpdateMedia
   * @apiGroup Media
   * @apiHeader {String} Authorization Bearer token.
   * @apiParam {Number} id Media item ID.
   * @apiBody {String} [title] Title of the media item.
   * @apiBody {String} [description] Description of the media item.
   * @apiSuccess {Object} media Updated media item.
   * @apiError {String} 400 Invalid input.
   */
  .put(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    body('title')
      .optional()
      .trim()
      .isString()
      .isLength({min: 3, max: 128})
      .escape(),
    body('description')
      .optional()
      .trim()
      .isString()
      .isLength({max: 1000})
      .escape(),
    validationErrors,
    mediaPut,
  )
  /**
   * @api {delete} /media/:id Delete a media item
   * @apiName DeleteMedia
   * @apiGroup Media
   * @apiHeader {String} Authorization Bearer token.
   * @apiParam {Number} id Media item ID.
   * @apiSuccess {String} message Success message.
   * @apiError {String} 400 Invalid input.
   */
  .delete(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    mediaDelete,
  );

/**
 * @api {get} /media/byuser/:id Get media items by user ID
 * @apiName GetMediaByUserId
 * @apiGroup Media
 * @apiParam {Number} id User ID.
 * @apiSuccess {Object[]} media List of media items.
 */
router.route('/byuser/:id').get(mediaByUserGet);

/**
 * @api {get} /media/bytoken Get media items by authenticated user
 * @apiName GetMediaByToken
 * @apiGroup Media
 * @apiHeader {String} Authorization Bearer token.
 * @apiSuccess {Object[]} media List of media items.
 */
router.route('/bytoken').get(authenticate, mediaByUserGet);

export default router;
