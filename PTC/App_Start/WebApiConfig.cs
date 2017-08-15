using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace PTC.App_Start
{
  public class WebApiConfig
  {
    public static void Register(HttpConfiguration config) {
      config.MapHttpAttributeRoutes();

      // Add a new route for API calls
      config.Routes.MapHttpRoute(
        name: "DefaultApi", 
        routeTemplate: "api/{controller}/{id}", 
        defaults: new { id = RouteParameter.Optional });
    }
  }
}