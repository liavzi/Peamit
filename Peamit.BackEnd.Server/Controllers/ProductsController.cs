using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Peamit.BackEnd.Model;

namespace Peamit.BackEnd.Server.Controllers
{
    public class ProductsController : ApiController
    {
        private readonly IProductDao _productDao;

        public ProductsController(IProductDao productDao)
        {
            _productDao = productDao;
        }

        // GET api/<controller>
        public IEnumerable<ProductDto> Get()
        {
            return _productDao.GetAll();
        }

        // GET api/<controller>/5
        public ProductDto Get(ulong id)
        {
            return Get().Single(x => x.Id == id);
        }

        // POST api/<controller>
        public void Post([FromBody]ProductDto product)
        {
            _productDao.Save(product);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]ProductDto product)
        {
            _productDao.GetAll().RemoveAll(x => x.Id == product.Id);
            _productDao.Save(product);
        }

        // DELETE api/<controller>/5
        public void Delete(ulong id)
        {
            _productDao.GetAll().RemoveAll(x => x.Id == id);
        }
    }
}