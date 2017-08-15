using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PTC.Controllers_Api
{
  public class CategoryController : ApiController
  {
    // GET api/<controller>
    [HttpGet()]
    [Route("api/Category/GetSearchCategories")]
    public IHttpActionResult GetSearchCategories() {
      IHttpActionResult ret = null;
      PTCViewModel vm = new PTCViewModel();

      vm.LoadSearchCategories();
      if (vm.SearchCategories.Count > 0) {
        ret = Ok(vm.SearchCategories);
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