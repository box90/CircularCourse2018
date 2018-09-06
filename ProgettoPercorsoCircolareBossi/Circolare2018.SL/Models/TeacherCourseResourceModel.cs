using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Circolare2018.SL.Models
{
    public class TeacherCourseResourceModel
    {
        public int ID { get; set; }
        public int ID_Resource { get; set; }
        public int ID_Course { get; set; }
        public string Notes { get; set; }
        public ResourceModel ResourceModel { get; set; }
        public CourseModel CourseModel { get; set; }

        public static TeacherCourseResourceModel MapModel(Entities.TEACHING teaching,Entities.RESOURCE resource,Entities.COURSE course)
        {
            return new TeacherCourseResourceModel
            {
                ID = teaching.ID,
                ID_Resource = teaching.ID_Resource,
                ID_Course = teaching.ID_Course,
                Notes = teaching.Notes,
                ResourceModel = ResourceModel.MapModel(resource),
                CourseModel = CourseModel.MapModel(course)
            };
        }

    }
}