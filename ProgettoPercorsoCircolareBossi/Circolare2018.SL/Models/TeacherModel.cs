using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Circolare2018.SL.Models
{
    public class TeacherModel
    {
        public int ID { get; set; }
        public int ID_Resource { get; set; }
        public int ID_Course { get; set; }
        public string Notes { get; set; }

        public static TeacherModel MapModel(Entities.TEACHING teaching)
        {
            return new TeacherModel
            {
                ID = teaching.ID,
                ID_Resource = teaching.ID_Resource,
                ID_Course = teaching.ID_Course,
                Notes = teaching.Notes
            };
        }

        public static Entities.TEACHING MapEntities(TeacherModel model)
        {
            return new Entities.TEACHING
            {
                ID = model.ID,
                ID_Resource = model.ID_Resource,
                ID_Course = model.ID_Resource,
                Notes = model.Notes
            };
        }
    }
}