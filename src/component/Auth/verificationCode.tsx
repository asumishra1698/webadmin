import React, { useState } from "react";

const VerificationCode: React.FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    // TODO: Add API call to verify code here
    setSuccess("Code verified successfully!");
    setCode("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Verification Code</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Verification Code</label>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
            autoComplete="one-time-code"
            pattern="\d{6}"
            inputMode="numeric"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerificationCode;