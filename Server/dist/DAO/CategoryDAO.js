var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Category from "../Models/Category.js";
class CategoryDAO {
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new Category(category);
            const result = yield newCategory.save().catch((err) => {
                return { error: err };
            });
            return result;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category.findById(id);
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category.findByIdAndDelete(id);
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        });
    }
    updateById(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield Category.findByIdAndUpdate(id, category);
            if (!updatedCategory) {
                throw new Error('Category not found');
            }
            return updatedCategory;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category.find();
        });
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Category.exists({ _id: id });
            return result !== null;
        });
    }
}
export default CategoryDAO;
