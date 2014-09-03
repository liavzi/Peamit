using System.Collections.Generic;
using Peamit.BackEnd.Model;

namespace Peamit.BackEnd.DataAccess
{
    public class ProductDao : IProductDao
    {
        private static List<ProductDto>_products = new List<ProductDto>();

        public void Save(ProductDto productDto)
        {
            _products.Add(productDto);
        }

        public List<ProductDto> GetAll()
        {
            return _products;
        }
    }
}
