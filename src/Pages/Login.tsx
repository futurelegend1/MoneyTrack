import Signup from "../Components/Login/Signup";
import LoginUser from "../Components/Login/LoginUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconMoneyTrack from "../assets/IconMoneyTrack";

function Login() {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Simulate successful Google login
    navigate("/");
  }

  const handleVisible = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen min-w-screen flex items-center justify-center">
      <section>
        <div onClick={handleIconClick} className="flex items-center justify-center gap-2 mb-2">
          <IconMoneyTrack className="w-15 h-15" />
          <p className="text-3xl font-semibold text-emerald-400">MoneyTrack</p>
        </div>
        {isSignup ? (
            <div key="login" className="animate-fade-right">
                <h2 className="text-3xl font-semibold text-white mb-4 text-center">Sign in to your account</h2>
                <LoginUser handleVisible={handleVisible} />
            </div>
        ) : (
            <div key="signup" className="animate-fade-left">
                <h2 className="text-3xl font-semibold text-white mb-4 text-center">Create an account</h2>
                <Signup handleVisible={handleVisible} />
            </div>
        )}
      </section>
    </div>
  );
}
export default Login;
