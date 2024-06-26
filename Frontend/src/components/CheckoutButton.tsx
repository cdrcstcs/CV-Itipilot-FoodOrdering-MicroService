import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useGetMyUser } from "@/api/MyUserApi";
type Props = {
  onCheckout: () => void;
  disabled: boolean;
};
const CheckoutButton = ({ onCheckout, disabled }: Props) => {
  const { currentUser} = useGetMyUser();
  if (!currentUser) {
    return <LoadingButton />;
  }
  return (
      <Button disabled={disabled} onClick={onCheckout} className="bg-blue-500 flex-1">
        Go to checkout
      </Button>
  );
};
export default CheckoutButton;
