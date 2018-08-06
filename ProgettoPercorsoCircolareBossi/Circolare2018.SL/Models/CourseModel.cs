using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Circolare2018.SL.Models
{
    public class CourseModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<int> RefYear { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<bool> IsCircular { get; set; }
        public Nullable<int> ID_Coordinator { get; set; }

        public static CourseModel MapModel(Entities.COURSE course)
        {
            return new CourseModel
            {
                ID = course.ID,
                Title = course.Title,
                Description = course.Description,
                RefYear = course.RefYear,
                StartDate = course.StartDate,
                EndDate = course.EndDate,
                IsCircular = course.IsCircular,
                ID_Coordinator = course.ID_Coordinator
            };
        }

        public static Entities.COURSE MapEntities(CourseModel model)
        {
            return new Entities.COURSE
            {
                ID = model.ID,
                Title = model.Title,
                Description = model.Description,
                RefYear = model.RefYear,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                IsCircular = model.IsCircular,
                ID_Coordinator = model.ID_Coordinator
            };
        }
    }
}