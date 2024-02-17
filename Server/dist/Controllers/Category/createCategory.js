var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CategoryDAO from "../../DAO/CategoryDAO.js";
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const categoryDAO = new CategoryDAO();
    const category = req.body;
    const newCategory = yield categoryDAO.create(category);
    // @ts-expect-error TS(2339): Property 'category' does not exist on type '(Docum... Remove this comment to see the full error message
    if ((_a = newCategory === null || newCategory === void 0 ? void 0 : newCategory.category) === null || _a === void 0 ? void 0 : _a.error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
    else {
        return res.status(201).json({ success: true, message: "Category created successfully", category: newCategory });
    }
});
export default createCategory;
