// client/src/pages/AddGig.tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import CustomInput from "../../components/input";
import Select from "../../components/input/select";
import Loader from "../../components/loader";
import { categories, inputs } from "../../utils/consttants";

const AddGig = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return; // إذا لم يتم اختيار أي ملف، أخرج من الدالة

  // تحويل FileList إلى Array
  setSelectedFiles(prev => [...prev, ...Array.from(files)]);
};


  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) =>
      api.post("/gigs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    onSuccess: (res) => {
      toast.success("Gig created 🚀");
      navigate(`/detail/${res.data.gig._id}`);
    },
    onError: () => {
      toast.error("Something went wrong ❌");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

  
    selectedFiles.forEach(file => formData.append("images", file));

    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 pt-24">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-5xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8">
          Create Your Gig ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {inputs.map((props, key) => (
              <CustomInput
                key={key}
                {...props}
                multiple={props.type === "file"}
                onChange={props.type === "file" ? handleImageChange : undefined}
              />
            ))}

            <Select
              label="Category"
              options={categories}
              name="category"
            />
          </div>

          {/* معاينة الصور */}
          {selectedFiles.length > 0 && (
            <div className="flex gap-4 flex-wrap mt-4">
              {selectedFiles.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded-md border border-gray-500"
                />
              ))}
            </div>
          )}

          <button
            disabled={isPending}
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-500 to-emerald-500
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300
              flex justify-center items-center
              shadow-lg shadow-green-500/20
            "
          >
            {isPending ? <Loader /> : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGig;