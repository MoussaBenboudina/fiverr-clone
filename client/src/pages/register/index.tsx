import { useContext, useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import Toggle from "../../components/input/toggle";
import AuthContext from "../../context/authContext";
import algeriaStates from "../../data/Wilaya_Of_Algeria.json";

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const { register } = useContext(AuthContext);

  // 📍 Auto detect wilaya
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        const stateName = data.address.state || data.address.county;

        const found = algeriaStates.find(
          (s) =>
            stateName?.toLowerCase().includes(s.name.toLowerCase()) ||
            stateName?.includes(s.ar_name)
        );

        if (found) {
          setSelectedWilaya(found.name);
        }
      } catch (err) {
        console.log("Location error", err);
      }
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // 👇 نضيف الولاية المختارة
    formData.set("country", selectedWilaya);

    const newUser: any = Object.fromEntries(formData.entries());
    newUser.isSeller = isSeller;

    register(newUser);
  };

  const inputStyle = `
    w-full bg-gray-800/50 border border-gray-700 text-sm text-white rounded-xl p-3 outline-none 
    focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all 
    placeholder:text-black
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090b11] p-4 text-white">
      <div className="w-full max-w-5xl bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-5">
          <h1 className="text-2xl font-bold text-emerald-400">Create Account</h1>
          <Link to="/login" className="text-sm text-gray-400 hover:text-emerald-400">
            Already a member? <span className="text-emerald-400 font-semibold">Sign In</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Row 1 */}
          <div className="grid md:grid-cols-3 gap-5">
            <input name="username" placeholder="Username" required className={inputStyle} />
            <input name="email" type="email" placeholder="Email" required className={inputStyle} />
            <input name="password" type="password" placeholder="Password" required className={inputStyle} />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Wilaya Select */}
            <select
              name="country"
              required
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className={inputStyle}
            >
              <option value="">Select your wilaya</option>

              {algeriaStates.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.code} - {state.name}
                </option>
              ))}
            </select>

            {/* File */}
            <input type="file" name="photo" className={inputStyle} />
          </div>

          {/* Seller */}
          <div className="p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <Toggle setIsSeller={setIsSeller} color="#000" />
              <span className="text-sm font-bold">
                Activate your seller account
              </span>
            </div>

            {isSeller && (
              <div className="grid md:grid-cols-4 gap-5">
                <input name="phone" placeholder="Phone" required className={inputStyle} />
                <textarea
                  name="desc"
                  placeholder="Your description"
                  required
                  className={`${inputStyle} col-span-3 text-black`}
                />
              </div>
            )}
          </div>

          {/* Button */}
          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;