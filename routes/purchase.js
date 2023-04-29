const express = require("express");
const router = express.Router();

const purchaseControllers = require("../controllers/premiumControllers");
const Authenticate = require("../middleware/Authenticate");

router.get("/premiumMembership",Authenticate.Authenticate,purchaseControllers.getOrderID);

router.post("/premiumMembership/UpdateTransaction", Authenticate.Authenticate, purchaseControllers.updateTransactionStatus)

router.post("/premiumMembership/StatusFail",Authenticate.Authenticate, purchaseControllers.StatusFail)
module.exports = router;