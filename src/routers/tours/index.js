'use strict'

const express = require('express');
const TourController = require('../../controllers/tour.controller');
const router = express.Router();
const  asyncHandler = require('../../helper/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

// // authentication token
// router.use(authentication);
// router.use(authenticationV2);
router.get("/list", asyncHandler(TourController.getAllTours));
router.get("/:id", asyncHandler(TourController.getTourById));
router.post("/create", asyncHandler(TourController.createTour));
router.put("/update/:id", asyncHandler(TourController.updateTour));
router.delete("/delete/:id", asyncHandler(TourController.deleteTour));

module.exports = router;