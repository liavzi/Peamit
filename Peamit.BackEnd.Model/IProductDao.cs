using System.Collections.Generic;

namespace Peamit.BackEnd.Model
{
    public interface IProductDao
    {
        void Save(ProductDto productDto);
        List<ProductDto> GetAll();
    }
}
