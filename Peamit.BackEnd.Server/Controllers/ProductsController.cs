using System.Collections.Generic;
using System.Web.Http;
using Peamit.BackEnd.Server.Models;

namespace Peamit.BackEnd.Server.Controllers
{
    public class ProductsController : ApiController
    {
        ProductDto[] _products = new ProductDto[]
        { 
            new ProductDto { Id = 1, Price = 1 }, 
            new ProductDto { Id = 2, Price = 3.75m}, 
            new ProductDto { Id = 3, Price = 16.99m } 
        };


        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]ProductDto product)
        {

        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}