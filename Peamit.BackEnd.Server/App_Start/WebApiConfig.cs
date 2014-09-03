using System.Web.Http;
using Microsoft.Practices.Unity;
using Peamit.BackEnd.DataAccess;
using Peamit.BackEnd.Model;
using Peamit.BackEnd.Server.Ioc;

namespace Peamit.BackEnd.Server
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var container = new UnityContainer();
            container.RegisterType<IProductDao, ProductDao>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}
