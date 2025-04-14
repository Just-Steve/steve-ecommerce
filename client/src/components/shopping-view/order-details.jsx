import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return "-";
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        {/* Order Info */}
        <div className="grid gap-2">
          <DetailRow label="Order ID" value={orderDetails?._id} />
          <DetailRow
            label="Order Date"
            value={formatDate(orderDetails?.orderDate)}
          />
          <DetailRow
            label="Order Price"
            value={`$${orderDetails?.totalAmount}`}
          />
          <DetailRow
            label="Payment Method"
            value={orderDetails?.paymentMethod}
          />
          <DetailRow
            label="Payment Status"
            value={orderDetails?.paymentStatus}
          />
          <DetailRow
            label="Order Status"
            value={
              <Badge
                className={`py-1 px-3 text-white capitalize ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-gray-700"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            }
          />
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-2">
          <h3 className="font-semibold">Order Items</h3>
          <ul className="grid gap-3">
            {orderDetails?.cartItems?.map((item, index) => (
              <li
                key={`${item._id}-${index}`}
                className="flex items-center justify-between text-sm"
              >
                <span>Title: {item.title}</span>
                <span>Qty: {item.quantity}</span>
                <span>Price: ${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="grid gap-2">
          <h3 className="font-semibold">Shipping Info</h3>
          <div className="grid gap-0.5 text-sm text-muted-foreground">
            <span>{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

// Small subcomponent for consistent layout
const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <p className="font-medium">{label}</p>
    <Label className="text-sm font-normal">{value}</Label>
  </div>
);

export default ShoppingOrderDetailsView;
