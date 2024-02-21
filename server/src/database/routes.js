const { Router } = require("express");
const controller = require("./controllerAccount");
const controllerDC = require("./controllerDC");
const router =  Router();
router.post("/account", controller.getAuthentification);
router.get("/account", controller.getAccounts);
router.post("/account/add", controller.addAccount);
router.get("/account/:id", controller.getAccountById);
router.put("/account/:id", controller.updateAccount);
router.delete("/account/:id", controller.deleteAccountById);


router.get("/dc", controllerDC.getDCs);
router.get("/dcByManager/:id", controllerDC.getDCsByManagerID);
router.post("/dc/add", controllerDC.addDC);
router.get("/dc/:id", controllerDC.getDCById);
router.get("/dc/candidat/:id", controllerDC.getDCByIdCandidat);
router.get("/dc/doc/:id", controllerDC.getDCDocById);
router.put("/dc/:id", controllerDC.updateDCDoc);
router.put("/dcAdmin/:id", controllerDC.updateDCByAdmin);
router.delete("/dc/:id", controllerDC.deleteDCById);

router.get("/dc-status", controllerDC.getAllDcStatus);
router.get("/dc/pdf/:id", controllerDC.getDCPDF);

module.exports = router;