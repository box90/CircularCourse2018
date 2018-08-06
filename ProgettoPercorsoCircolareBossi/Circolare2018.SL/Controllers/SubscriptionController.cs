using Circolare2018.BL;
using Circolare2018.SL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Circolare2018.SL.Controllers
{
    [RoutePrefix("api/subscription")]
    public class SubscriptionController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            List<SubscriptionModel> Smodel = new List<SubscriptionModel>();

            foreach (Entities.SUBSCRIPTION sub in SubscriptionManager.GetAllSubscriptions())
            {
                Smodel.Add(SubscriptionModel.MapModel(sub));
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Smodel));
        }

        [Route("{id:int}")]
        public IHttpActionResult GetSubscription(int id)
        {
            SubscriptionModel Smodel = SubscriptionModel.MapModel(SubscriptionManager.GetSubscription(id));

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Smodel));
        }

        [Route("update")]
        public IHttpActionResult UpdateSubscription([FromBody]SubscriptionModel subToUpdate)
        {
            bool isModified = SubscriptionManager.UpdateSubscription(SubscriptionModel.MapEntities(subToUpdate));
            if (isModified)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [Route("insert")]
        public IHttpActionResult InsertSubscription([FromBody]SubscriptionModel subToInsert)
        {
            bool isInserted = SubscriptionManager.InsertSubscription(SubscriptionModel.MapEntities(subToInsert));
            if (isInserted)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [HttpDelete]
        [Route("remove/{id:int}")]
        public IHttpActionResult RemoveSubscription(int id)
        {
            bool isRemoved = SubscriptionManager.RemoveSubscription(id);
            if (isRemoved)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }
    }
}
