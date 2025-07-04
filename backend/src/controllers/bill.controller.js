import wrapAsync from "../utils/tryCatchWapper.js";
import { createBillService, getBillByIdService, getAllBillsService } from "../services/bill.service.js";

export const createBill = wrapAsync(async (req, res) => {
  const billData = req.body;

  // ✅ Inject shopId from logged-in user (set by authMiddleware)
  billData.shopId = req.user.shopId;

  const userId = req.user._id;
  const newBill = await createBillService(billData, userId);

  res.status(201).json({ message: "Bill created successfully", bill: newBill });
});


export const getBillById = wrapAsync(async (req, res) => {
    const billId = req.params.id;
    const bill = await getBillByIdService(billId);
    res.status(200).json({ bill });
});

export const getAllBills = wrapAsync(async (req, res) => {
    const shopId = req.user.shopId;
    //console.log("Shop ID from user:", shopId);
    if (!shopId) {
        return res.status(400).json({ message: "Shop ID is required" });
    }
    const bills = await getAllBillsService(shopId);
    res.status(200).json({ bills });
});
