using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Circolare2018.SL.Models
{
    public class SubscriptionCourseResourceModel
    {
        public int ID { get; set; }
        public int ID_Resource { get; set; }
        public int ID_Course { get; set; }
        public int ID_CP { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> MaxEndDate { get; set; }
        public Nullable<bool> IsAdmitted { get; set; }
        public string Notes { get; set; }
        public CourseModel CourseModel { get; set; }
        public ResourceModel ResourceModel { get; set; }
        public ResourceModel CpModel { get; set; }


        public static SubscriptionCourseResourceModel MapModel(Entities.SUBSCRIPTION sub,Entities.COURSE course, Entities.RESOURCE resource, Entities.RESOURCE cp)
        {
            SubscriptionCourseResourceModel result = new SubscriptionCourseResourceModel();

            //map Subscription
            result.ID = sub.ID;
            result.ID_Course = sub.ID_Course;
            result.ID_CP = sub.ID_CP;
            result.ID_Resource = sub.ID_Resource;
            result.StartDate = sub.StartDate;
            result.MaxEndDate = sub.MaxEndDate;
            result.IsAdmitted = sub.IsAdmitted;
            result.Notes = sub.Notes;
            //map Course
            result.CourseModel = CourseModel.MapModel(course);
            //map Resources
            result.ResourceModel = ResourceModel.MapModel(resource);
            //map Cp
            result.CpModel = ResourceModel.MapModel(cp);

            return result;
        }
    }

 
}