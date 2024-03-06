

using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private StoreContext _context;
        public BasketController(StoreContext context){
            _context = context;

        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        


        [HttpPost]

        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId , int quantity)
        {
            //get Basket || create new
            var basket = await RetriveBasket();
            if(basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            //add item
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result )  return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title = "Problem adding item to basket"});
        }

    

        [HttpDelete]

        public async Task<ActionResult> RemoveBasketItem(int productId , int quantity)
        {
            //get Basket
            var basket = await RetriveBasket();
            if(basket == null) return NotFound();
            //remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if(result )  return Ok();
            return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
          
        }
         private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var CookieOptions = new CookieOptions
            {
               IsEssential = true, 
               Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, CookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}