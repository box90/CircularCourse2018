using Circolare2018.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Circolare2018.BL
{
    public static class SubscriptionManager
    {
        public static List<Entities.SUBSCRIPTION> GetAllSubscriptions()
        {
            EFRepository<Entities.SUBSCRIPTION> repo = new EFRepository<Entities.SUBSCRIPTION>();
            return repo.GetAll().ToList();
        }

        public static Entities.SUBSCRIPTION GetSubscription(int id)
        {
            EFRepository<Entities.SUBSCRIPTION> repo = new EFRepository<Entities.SUBSCRIPTION>();
            return repo.Find(x => x.ID == id).First();
        }

        public static bool UpdateSubscription(Entities.SUBSCRIPTION SubscriptionToUpdate)
        {
            bool resultOperation = false;
            EFRepository<Entities.SUBSCRIPTION> repo = new EFRepository<Entities.SUBSCRIPTION>();
            Entities.SUBSCRIPTION mod = repo.Find(x => x.ID == SubscriptionToUpdate.ID).First();

            if (mod != null)
            {
                try
                {
                    repo.Update(SubscriptionToUpdate);
                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //Inserire LOG
                    resultOperation = false;
                }
            }

            return resultOperation;
        }

        public static bool InsertSubscription(Entities.SUBSCRIPTION SubscriptionToInsert)
        {
            bool resultOperation = false;
            EFRepository<Entities.SUBSCRIPTION> repo = new EFRepository<Entities.SUBSCRIPTION>();
            Entities.SUBSCRIPTION exists = repo.Find(x => x.ID == SubscriptionToInsert.ID).First();

            if (exists == null)
            {
                try
                {
                    repo.Add(SubscriptionToInsert);
                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //Inserire LOG
                    resultOperation = false;
                }
            }

            return resultOperation;
        }

        public static bool RemoveSubscription(int id)
        {
            bool resultOperation = false;
            EFRepository<Entities.SUBSCRIPTION> repo = new EFRepository<Entities.SUBSCRIPTION>();
            Entities.SUBSCRIPTION exists = repo.Find(x => x.ID == id).First();

            if (exists != null)
            {
                try
                {
                    repo.Delete(exists);
                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //inserire LOG
                    resultOperation = false;
                }
            }

            return resultOperation;
        }
    }
}
