using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Circolare2018.SL.Controllers
{
    [RoutePrefix("api/resource")]
    public class ResourceController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            return Ok();
        }
    }
}
