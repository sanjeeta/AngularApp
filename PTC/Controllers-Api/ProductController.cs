using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PTC.Controllers_Api
{
  public class ProductController : ApiController
  {
    // GET api/<controller>
    public IHttpActionResult Get() {
      IHttpActionResult ret = null;
      PTCViewModel vm = new PTCViewModel();

      // throw new ApplicationException("Error in the Get() method");

      vm.Get();
      // vm.Products.Clear();
      if (vm.Products.Count > 0) {
        ret = Ok(vm.Products);
      }
      else {
        ret = NotFound();
      }

      return ret;
    }

    [HttpPost()]
    [Route("api/Product/Search")]
    public IHttpActionResult Search(
      ProductSearch searchEntity) {
      IHttpActionResult ret = null;
      PTCViewModel vm = new PTCViewModel();

      // Search for Products
      vm.SearchEntity = searchEntity;
      vm.Search();
      if (vm.Products.Count > 0) {
        ret = Ok(vm.Products);
      }
      else {
        ret = NotFound();
      }

      return ret;
    }

    // GET api/<controller>/5
    public string Get(int id) {
      return "value";
    }

    // POST api/<controller>
    public void Post([FromBody]string value) {
    }

    // PUT api/<controller>/5
    public void Put(int id, [FromBody]string value) {
    }

    // DELETE api/<controller>/5
    public void Delete(int id) {
    }
  }
}