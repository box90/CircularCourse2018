using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Circolare2018.SL.Models
{
    public class ResourceModel
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Nullable<bool> IsAvaiable { get; set; }
        public Nullable<bool> IsCP { get; set; }

        public static ResourceModel MapModel(Entities.RESOURCE resource)
        {
            return new ResourceModel
            {
                ID = resource.ID,
                UserName = resource.UserName,
                Name = resource.Name,
                Surname = resource.Surname,
                IsAvaiable = resource.IsAvaiable,
                IsCP = resource.IsCP
            };
        }
    }
}