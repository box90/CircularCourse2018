﻿using Circolare2018.BL;
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
    [RoutePrefix("api/course")]
    //[EnableCors(origins: "http://localhost:58301", headers: "*", methods: "*")]
    public class CourseController : ApiController
    {
        [HttpGet]
        public IEnumerable<CourseModel> GetAll()
        {
            List<CourseModel> Cmodel = new List<CourseModel>();

            foreach (Entities.COURSE course in CourseManager.GetAllCourses())
            {
                Cmodel.Add(CourseModel.MapModel(course));
            }

            return Cmodel;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetCourse(int id)
        {
            CourseModel Cmodel = CourseModel.MapModel(CourseManager.GetCourse(id));

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(Cmodel));
        }

        [HttpPut]
        [Route("update")]
        public IHttpActionResult UpdateCourse([FromBody]CourseModel courseToUpdate)
        {
            bool isModified = CourseManager.UpdateCourse(CourseModel.MapEntities(courseToUpdate));
            if (isModified)
            {
                return Ok();
            }
            return BadRequest($"Cannot update Course, Title: {courseToUpdate.Title}. Check parameters");
        }

        [HttpPost]
        [Route("insert")]
        public IHttpActionResult InsertCourse([FromBody]CourseModel courseToInsert)
        {
            bool isInserted = CourseManager.InsertCourse(CourseModel.MapEntities(courseToInsert));
            if (isInserted)
            {
                return Ok();
            }
            return BadRequest($"Cannot insert Course, Title: {courseToInsert.Title}. Check parameters");
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
            return NotFound();
        }
    }
}
