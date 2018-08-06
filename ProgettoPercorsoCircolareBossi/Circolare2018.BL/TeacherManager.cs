using Circolare2018.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Circolare2018.BL
{
    public static class TeacherManager
    {
        public static List<Entities.TEACHING> GetAllTeachings()
        {
            EFRepository<Entities.TEACHING> repo = new EFRepository<Entities.TEACHING>();
            return repo.GetAll().ToList();
        }

        public static Entities.TEACHING GetTeaching(int id)
        {
            EFRepository<Entities.TEACHING> repo = new EFRepository<Entities.TEACHING>();
            return repo.Find(x => x.ID == id).FirstOrDefault();
        }

        public static bool UpdateTeaching(Entities.TEACHING TeachingToUpdate)
        {
            bool resultOperation = false;
            EFRepository<Entities.TEACHING> repo = new EFRepository<Entities.TEACHING>();
            Entities.TEACHING mod = repo.FindNoTracking(x => x.ID == TeachingToUpdate.ID).FirstOrDefault();

            if (mod != null)
            {
                try
                {
                    repo.Update(TeachingToUpdate);
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

        public static bool InsertTeaching(Entities.TEACHING TeachingToInsert)
        {
            bool resultOperation = false;
            EFRepository<Entities.TEACHING> repo = new EFRepository<Entities.TEACHING>();
            Entities.TEACHING exists = repo.FindNoTracking(x => x.ID == TeachingToInsert.ID).FirstOrDefault();

            if (exists == null)
            {
                try
                {
                    repo.Add(TeachingToInsert);
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

        public static bool RemoveTeaching(int id)
        {
            bool resultOperation = false;
            EFRepository<Entities.TEACHING> repo = new EFRepository<Entities.TEACHING>();
            Entities.TEACHING exists = repo.FindNoTracking(x => x.ID == id).FirstOrDefault();

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
