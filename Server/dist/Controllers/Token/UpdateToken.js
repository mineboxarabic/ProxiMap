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
const updateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDAO = new TokenDAO();
    const id = req.params.id;
    const token = req.body;
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    const valid = ValidateRes(req);
    // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
    if (valid != true)
        return res.status(400).json(valid);
    const tokenExists = yield tokenDAO.findById(id);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (tokenExists.error) {
        res.status(404).json({ error: "Token not found" });
        return;
    }
    const response = yield tokenDAO.updateById(id, token);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (response.error) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        if (response.error.code === 11000) {
            res.status(409).json({ error: "Token already exists" });
            return;
        }
        res.status(400).json(response);
        return;
    }
    res.status(200).json({ message: "Token updated successfully" });
});
export default updateToken;
