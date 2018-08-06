using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Circolare2018.SL.Models
{
    public class SubscriptionModel
    {
        public int ID { get; set; }
        public int ID_Resource { get; set; }
        public int ID_Course { get; set; }
        public int ID_CP { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> MaxEndDate { get; set; }
        public Nullable<bool> IsAdmitted { get; set; }
        public string Notes { get; set; }

        public static SubscriptionModel MapModel(Entities.SUBSCRIPTION subscription)
        {
            return new SubscriptionModel
            {
                ID = subscription.ID,
                ID_Resource = subscription.ID_Resource,
                ID_Course = subscription.ID_Course,
                ID_CP = subscription.ID_CP,
                StartDate = subscription.StartDate,
                MaxEndDate = subscription.MaxEndDate,
                IsAdmitted = subscription.IsAdmitted,
                Notes = subscription.Notes
            };
        }

        public static Entities.SUBSCRIPTION MapEntities(SubscriptionModel model)
        {
            return new Entities.SUBSCRIPTION
            {
                ID = model.ID,
                ID_Resource = model.ID_Resource,
                ID_Course = model.ID_Course,
                ID_CP = model.ID_CP,
                StartDate = model.StartDate,
                MaxEndDate = model.MaxEndDate,
                IsAdmitted = model.IsAdmitted,
                Notes = model.Notes
            };
        }
    }
}