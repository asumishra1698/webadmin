import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  loginRequest,
  requestEmailLoginOtpRequest,
  verifyEmailLoginOtpRequest,
} from "../../redux/actions/authActions";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const otpVerified = useSelector((state: any) => state.auth.otpVerified);
  const otpSuccess = useSelector((state: any) => state.auth.otpSuccess);

  // Local state
  const [loginType, setLoginType] = useState<"password" | "otp">("password");
  const [role, setRole] = useState("admin");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpModal, setShowOtpModal] = useState(false);

  // OTP input refs
  const otpRefs = useMemo(
    () => Array.from({ length: 4 }, () => React.createRef<HTMLInputElement>()),
    []
  );

  useEffect(() => {
    if (otpVerified) {
      setShowOtpModal(false);
    }
  }, [otpVerified]);

  // OTP modal open after OTP sent
  useEffect(() => {
    if (otpSuccess) {
      setOtp(["", "", "", ""]);
      setShowOtpModal(true);
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    }
  }, [otpSuccess, otpRefs]);

  // OTP input change handler
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
    if (!value && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Send OTP handler
  const handleSendOtp = () => {
    const isMobile = /^\d{10}$/.test(identifier);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    let payload: any = { role };
    if (isMobile) {
      payload.mobile = identifier;
    } else if (isEmail) {
      payload.email = identifier;
    } else {
      toast.error("Please enter a valid email or 10-digit mobile number");
      return;
    }

    dispatch(requestEmailLoginOtpRequest(payload));
  };

  // Verify OTP handler
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    let payload: any = { otp: code, role };
    const isMobile = /^\d{10}$/.test(identifier);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    if (isMobile) {
      payload.mobile = identifier;
    } else if (isEmail) {
      payload.email = identifier;
    }

    dispatch(verifyEmailLoginOtpRequest({ ...payload, navigate }));
  };

  // Password login handler
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;
    const isMobile = /^\d{10}$/.test(identifier);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    let payload: any = { password, role };

    if (isMobile) {
      payload.mobile = identifier;
    } else if (isEmail) {
      payload.email = identifier;
    } else {
      toast.error("Please enter a valid email or 10-digit mobile number");
      return;
    }

    dispatch(loginRequest({ ...payload, navigate }));
    console.log("Login request dispatched with payload:", payload);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/watercolor-sugar-cotton-clouds-background_23-2149230242.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-md md:max-w-4xl overflow-hidden mx-2 sm:mx-4">
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-1">Login</h2>
          <p className="text-gray-500 mb-8 text-base">
            Login with Password or OTP
          </p>
          <div className="flex items-center mb-7 gap-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="accent-blue-600"
                checked={loginType === "password"}
                onChange={() => setLoginType("password")}
              />
              <span className="ml-2 text-gray-700 font-medium">Password</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="accent-blue-600"
                checked={loginType === "otp"}
                onChange={() => setLoginType("otp")}
              />
              <span className="ml-2 text-gray-700 font-medium">OTP</span>
            </label>
          </div>
          <form
            autoComplete="off"
            onSubmit={
              loginType === "password"
                ? handlePasswordLogin
                : (e) => e.preventDefault()
            }
          >
            <div className="mb-5">
              <label
                className="block text-gray-700 mb-1 font-medium"
                htmlFor="identifier"
              >
                Email or Mobile
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                type="text"
                id="identifier"
                placeholder="Enter email or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 mb-1 font-medium"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Superadmin</option>
              </select>
            </div>
            {loginType === "password" ? (
              <>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 mb-1 font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition text-lg shadow"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                type="button"
                className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition text-lg shadow"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            )}
            <div className="flex justify-between mt-2 text-sm">
              <a href="/" className="text-blue-600 hover:underline font-medium">
                Forgot my password
              </a>
            </div>
          </form>
        </div>
        {/* Right: Image */}
        <div className="hidden md:block w-1/2 bg-blue-900 flex items-center justify-center">
          <img
            src="https://img.freepik.com/premium-vector/secure-mobile-app-login-user-interface-design_477639-6898.jpg"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowOtpModal(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Verify OTP
            </h3>
            <form onSubmit={handleVerifyOtp}>
              <div className="flex space-x-3 justify-center mb-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                        otpRefs[idx - 1].current?.focus();
                      }
                    }}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
