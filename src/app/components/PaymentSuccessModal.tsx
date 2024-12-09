import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentSuccessModal({
  isOpen,
  onClose,
}: PaymentSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-white rounded-xl shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-center text-gray-600">
            Thank you for your purchase. Your account has been upgraded
            successfully.
          </p>
        </CardContent>
        <CardFooter className="bg-gray-50 p-6">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
