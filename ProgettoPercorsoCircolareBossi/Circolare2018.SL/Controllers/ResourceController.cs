using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Circolare2018.BL;
using Circolare2018.SL.Models;

namespace Circolare2018.SL.Controllers
{
    [RoutePrefix("api/resource")]
    [EnableCors(origins: "http://localhost:58301", headers: "*", methods: "*")]
    public class ResourceController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            List<ResourceModel> Rmodel = new List<ResourceModel>();

            foreach (Entities.RESOURCE res in ResourceManager.GetAllResources())
            {
                Rmodel.Add(ResourceModel.MapModel(res));
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Rmodel));
        }

        [Route("{id:int}")]
        public IHttpActionResult GetResource(int id)
        {
            ResourceModel Rmodel = ResourceModel.MapModel(ResourceManager.GetResource(id));

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Rmodel));
        }

        [Route("update")]
        public IHttpActionResult UpdateResource([FromBody]ResourceModel model)
        {
            bool isModified = ResourceManager.UpdateResource(ResourceModel.MapEntities(model));
            if (isModified)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [Route("insert")]
        public IHttpActionResult InsertResource([FromBody]ResourceModel modelToInsert)
        {
            bool isInserted = ResourceManager.InsertResource(ResourceModel.MapEntities(modelToInsert));
            if (isInserted)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [HttpDelete]
        [Route("remove/{id:int}")]
        public IHttpActionResult RemoveResource(int id)
        {
            bool isRemoved = ResourceManager.RemoveResource(id);
            if (isRemoved)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }
    }
}
