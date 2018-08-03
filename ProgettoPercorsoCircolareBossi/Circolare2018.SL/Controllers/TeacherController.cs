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
    [RoutePrefix("api/teacher")]
    public class TeacherController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            List<TeacherModel> Tmodel = new List<TeacherModel>();

            foreach (Entities.TEACHING teach in TeacherManager.GetAllTeachings())
            {
                Tmodel.Add(TeacherModel.MapModel(teach));
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Tmodel));
        }

        [Route("{id:int}")]
        public IHttpActionResult GetTeacher(int id)
        {
            TeacherModel Tmodel = TeacherModel.MapModel(TeacherManager.GetTeaching(id));

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Tmodel));
        }

        [Route("update")]
        public IHttpActionResult UpdateTeacher(Entities.TEACHING teachToUpdate)
        {
            bool isModified = TeacherManager.UpdateTeaching(teachToUpdate);
            if (isModified)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [Route("insert")]
        public IHttpActionResult InsertTeacher(Entities.TEACHING teachToInsert)
        {
            bool isInserted = TeacherManager.InsertTeaching(teachToInsert);
            if (isInserted)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [Route("remove/{id:int}")]
        public IHttpActionResult RemoveTeacher(int id)
        {
            bool isRemoved = TeacherManager.RemoveTeaching(id);
            if (isRemoved)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }
    }
}
