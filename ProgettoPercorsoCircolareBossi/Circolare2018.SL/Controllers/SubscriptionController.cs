using Circolare2018.BL;
using Circolare2018.SL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Circolare2018.SL.Controllers
{
    [RoutePrefix("api/subscription")]
    //[EnableCors(origins: "http://localhost:58301", headers: "*", methods: "*")]
    public class SubscriptionController : ApiController
    {
        [HttpGet]
        public IEnumerable<Models.SubscriptionModel> GetAll()
        {
            List<SubscriptionModel> Smodel = new List<SubscriptionModel>();

            foreach (Entities.SUBSCRIPTION sub in SubscriptionManager.GetAllSubscriptions())
            {
                Smodel.Add(SubscriptionModel.MapModel(sub));
            }

            return Smodel;
        }

        [HttpGet]
        [Route("all")]
        public IEnumerable<Models.SubscriptionCourseResourceModel> GetAllMixed()
        {
            List<SubscriptionCourseResourceModel> mixedModel = new List<SubscriptionCourseResourceModel>();

            foreach (Entities.SUBSCRIPTION sub in SubscriptionManager.GetAllSubscriptions())
            {
                //sub.RESOURCE1 is the Resource
                //sub.RESOURCE is the CP
                mixedModel.Add(SubscriptionCourseResourceModel.MapModel(sub, sub.COURSE, sub.RESOURCE1,sub.RESOURCE));
            }

            return mixedModel;
        }

        [HttpGet]
        [Route("resource/{idResource:int}")]
        public IEnumerable<Models.SubscriptionCourseResourceModel> GetSubscriptionOfResource(int idResource)
        {
            List<SubscriptionCourseResourceModel> Smodel = new List<SubscriptionCourseResourceModel>();

            foreach (Entities.SUBSCRIPTION sub in SubscriptionManager.GetAllSubscriptions().Where(s => s.ID_Resource == idResource).ToList())
            {
                Smodel.Add(SubscriptionCourseResourceModel.MapModel(sub,sub.COURSE,sub.RESOURCE1,sub.RESOURCE));
            }

            return Smodel;
        }

        [HttpGet]
        [Route("course/{idCourse:int}")]
        public IEnumerable<Models.SubscriptionCourseResourceModel> GetSubscriptionOfCourse(int idCourse)
        {
            List<SubscriptionCourseResourceModel> Smodel = new List<SubscriptionCourseResourceModel>();

            foreach (Entities.SUBSCRIPTION sub in SubscriptionManager.GetAllSubscriptions().Where(s => s.ID_Course == idCourse).ToList())
            {
                Smodel.Add(SubscriptionCourseResourceModel.MapModel(sub, sub.COURSE, sub.RESOURCE1, sub.RESOURCE));
            }

            return Smodel;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetSubscription(int id)
        {
            SubscriptionModel Smodel = SubscriptionModel.MapModel(SubscriptionManager.GetSubscription(id));

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Smodel));
        }

        [HttpGet]
        [Route("all/{id:int}")]
        public IHttpActionResult GetSubscriptionMixed(int id)
        {
            Entities.SUBSCRIPTION sub = SubscriptionManager.GetSubscription(id);
            if (sub != null)
            {
                SubscriptionCourseResourceModel Smodel = SubscriptionCourseResourceModel.MapModel(sub,sub.COURSE,sub.RESOURCE1,sub.RESOURCE);
                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Smodel));
            }
            else
            {
               return NotFound();
            }

            
        }

        [HttpPut]
        [Route("update")]
        public IHttpActionResult UpdateSubscription([FromBody]SubscriptionModel subToUpdate)
        {
            bool isModified = SubscriptionManager.UpdateSubscription(SubscriptionModel.MapEntities(subToUpdate));
            if (isModified)
            {
                return Ok();
            }
            return BadRequest($"Cannot update Subscription, ID: {subToUpdate.ID}. Check parameters");
        }

        [HttpPost]
        [Route("insert")]
        public IHttpActionResult InsertSubscription([FromBody]SubscriptionModel subToInsert)
        {
            bool isInserted = SubscriptionManager.InsertSubscription(SubscriptionModel.MapEntities(subToInsert));
            if (isInserted)
            {
                return Ok();
            }
            return BadRequest($"Cannot insert Subscription, ID: {subToInsert.ID}. Check parameters");
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
