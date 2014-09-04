using System.Collections.Generic;
using System.Linq;
using Microsoft.Win32;
using Peamit.BackEnd.Model;
using Raven.Client;
using Raven.Client.Document;


namespace Peamit.BackEnd.DataAccess
{
    public class ProductDao : IProductDao
    {
        private static IDocumentStore DocumentStore;

        static ProductDao()
        {
            DocumentStore = new DocumentStore {Url = "http://localhost:8080/",DefaultDatabase = "Peamit"};
            DocumentStore.Initialize();
        }

        public void Save(ProductDto productDto)
        {
            using (var session = DocumentStore.OpenSession())
            {
                session.Store(productDto);
                session.SaveChanges();
            }       
        }

        public List<ProductDto> GetAll()
        {
            return DocumentStore.OpenSession().Query<ProductDto>().ToList();
        }
    }
}
