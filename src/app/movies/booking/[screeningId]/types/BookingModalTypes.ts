export interface Step1BookingModalProps {
  movieTitle: string;
  screeningTime: string;
  seats: string[];
  totalPrice: number;
  formatScreeningTime: (time: string) => string;
}

export interface UserInfo {
  email: string;
  phoneNumber: string;
  name: string;
}

export interface Step2BookingModalProps {
  userInfo: UserInfo;
  onInputChange: (name: string, value: string) => void;
}

export type PaymentMethod = 'swish' | 'card' | 'atCinema'; //Maybe not used anymore in bookingmodal step 3

export interface Step3BookingModalProps {
  totalPrice: number;
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  error: string | null;
}

export interface PaymentOptionProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

export interface Step4BookingModalProps {
  bookingId: string | null;
  movieTitle: string;
  screeningTime: string;
  seats: string[];
  userInfo: UserInfo;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  formatScreeningTime: (timeString: string) => string;
}
