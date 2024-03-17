

using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregate
{
    public class Order
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }
        
        [Required]
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        public List<OrderItem> OrderItems { get; set; }

        public long Subtotal { get; set; }
        public long DelivryFee { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.pending;
        public long GetTotal()
        {
            return Subtotal + DelivryFee;
        }

    }
}