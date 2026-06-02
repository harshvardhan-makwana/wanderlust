const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  renderNewForm,
  showListings,
  createListings,
  renderEditForm,
  updateListings,
  destroyListing,
} = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index route
router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListings),
  );

router.get("/new", isLoggedIn, wrapAsync(renderNewForm));

router
  .route("/:id")
  .get(wrapAsync(showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListings),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing));
//create route
router;

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

module.exports = router;
