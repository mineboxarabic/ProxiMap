var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
const readToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDAO = new TokenDAO();
    const id = req.params.id;
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    const valid = ValidateRes(req);
    // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
    if (valid != true)
        return res.status(400).json(valid);
    const token = yield tokenDAO.findById(id);
    if (!token) {
        res.status(404).json({ error: "Token not found" });
        return;
    }
    res.status(200).json(token);
});
export default readToken;
