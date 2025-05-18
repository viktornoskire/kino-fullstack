"use client";
import { Step2BookingModalProps } from "./types/BookingModalTypes";

export default function Step2BookingModal({
  userInfo,
  onInputChange,
}: Step2BookingModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <>
      <p className="text-sm mb-4">
        Please provide your information to continue:
      </p>

      <div className="space-y-3">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium mb-1"
          >
            Phone Number*
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            required
          />
        </div>
      </div>
    </>
  );
}
