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
    [RoutePrefix("api/teacher")]
    //[EnableCors(origins: "http://localhost:58301", headers: "*", methods: "*")]
    public class TeacherController : ApiController
    {
        [HttpGet]
        public IEnumerable<Models.TeacherCourseResourceModel> GetAll()
        {
            List<TeacherCourseResourceModel> Tmodel = new List<TeacherCourseResourceModel>();

            foreach (Entities.TEACHING teach in TeacherManager.GetAllTeachings())
            {
                Tmodel.Add(TeacherCourseResourceModel.MapModel(teach,teach.RESOURCE,teach.COURSE));
            }

            return Tmodel;
        }

        [HttpGet]
        [Route("course/{idCourse:int}")]
        public IEnumerable<Models.TeacherCourseResourceModel> GetTeachersOfCourse(int idCourse)
        {
            List<TeacherCourseResourceModel> Tmodel = new List<TeacherCourseResourceModel>();

            foreach (Entities.TEACHING teach in TeacherManager.GetAllTeachings().Where(t => t.ID_Course == idCourse).ToList())
            {
                Tmodel.Add(TeacherCourseResourceModel.MapModel(teach, teach.RESOURCE, teach.COURSE));
            }

            return Tmodel;
        }

        [HttpGet]
        [Route("resource/{idResource:int}")]
        public IEnumerable<Models.TeacherCourseResourceModel> GetTeachingOfResource(int idResource)
        {
            List<TeacherCourseResourceModel> Tmodel = new List<TeacherCourseResourceModel>();

            foreach (Entities.TEACHING teach in TeacherManager.GetAllTeachings().Where(t => t.ID_Resource == idResource).ToList())
            {
                Tmodel.Add(TeacherCourseResourceModel.MapModel(teach, teach.RESOURCE, teach.COURSE));
            }

            return Tmodel;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetTeacher(int id)
        {
            Entities.TEACHING teaching = TeacherManager.GetTeaching(id);
            if (teaching != null)
            {
                TeacherCourseResourceModel Tmodel = TeacherCourseResourceModel.MapModel(teaching,teaching.RESOURCE,teaching.COURSE);
                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Tmodel));
            }
            else
            {
                return NotFound();
            } 
        }

        [HttpPut]
        [Route("update")]
        public IHttpActionResult UpdateTeacher([FromBody]TeacherModel teachToUpdate)
        {
            bool isModified = TeacherManager.UpdateTeaching(TeacherModel.MapEntities(teachToUpdate));
            if (isModified)
            {
                return Ok();
            }
             return BadRequest($"Cannot update Teaching, ID: {teachToUpdate.ID}. Check parameters");
        }

        [HttpPost]
        [Route("insert")]
        public IHttpActionResult InsertTeacher([FromBody]TeacherModel teachToInsert)
        {
            bool isInserted = TeacherManager.InsertTeaching(TeacherModel.MapEntities(teachToInsert));
            if (isInserted)
            {
                return Ok();
            }
            return BadRequest($"Cannot insert Teaching, ID: {teachToInsert.ID}. Check parameters");
        }

        [HttpDelete]
        [Route("remove/{id:int}")]
        public IHttpActionResult RemoveTeacher(int id)
        {
            bool isRemoved = TeacherManager.RemoveTeaching(id);
            if (isRemoved)
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
