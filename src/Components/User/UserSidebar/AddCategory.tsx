import { Plus } from "lucide-react";

function AddCategory() {
    return (
        <button className="bg-emerald-600 hover:bg-emerald-700 hover:scale-110 transition-all duration-300 text-white p-2 rounded-full">
            <Plus size={40} />
        </button>
    );
}
export default AddCategory;