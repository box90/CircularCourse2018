﻿using Circolare2018.BL;
using Circolare2018.SL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Circolare2018.SL.Controllers
{
    [RoutePrefix("api/course")]
    public class CourseController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            List<CourseModel> Cmodel = new List<CourseModel>();

            foreach (Entities.COURSE course in CourseManager.GetAllCourses())
            {
                Cmodel.Add(CourseModel.MapModel(course));
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Cmodel));
        }

        [Route("{id:int}")]
        public IHttpActionResult GetCourse(int id)
        {
            CourseModel Cmodel = CourseModel.MapModel(CourseManager.GetCourse(id));

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Cmodel));
        }

        [Route("update")]
        public IHttpActionResult UpdateCourse([FromBody]CourseModel courseToUpdate)
        {
            bool isModified = CourseManager.UpdateCourse(CourseModel.MapEntities(courseToUpdate));
            if (isModified)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [Route("insert")]
        public IHttpActionResult InsertCourse([FromBody]CourseModel courseToInsert)
        {
            bool isInserted = CourseManager.InsertCourse(CourseModel.MapEntities(courseToInsert));
            if (isInserted)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }

        [HttpDelete]
        [Route("remove/{id:int}")]
        public IHttpActionResult RemoveCourse(int id)
        {
            bool isRemoved = CourseManager.RemoveCourse(id);
            if (isRemoved)
            {
                return Ok();
            }
            //Trovare un Return decente
            return NotFound();
        }
    }
}
