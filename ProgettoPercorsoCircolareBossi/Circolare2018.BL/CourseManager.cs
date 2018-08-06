using Circolare2018.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Circolare2018.BL
{
    public static class CourseManager
    {
        public static List<Entities.COURSE> GetAllCourses()
        {
            EFRepository<Entities.COURSE> repo = new EFRepository<Entities.COURSE>();
            return repo.GetAll().ToList();
        }

        public static Entities.COURSE GetCourse(int id)
        {
            EFRepository<Entities.COURSE> repo = new EFRepository<Entities.COURSE>();
            return repo.Find(x => x.ID == id).First();
        }

        public static bool UpdateCourse(Entities.COURSE courseToUpdate)
        {
            bool resultOperation = false;
            EFRepository<Entities.COURSE> repo = new EFRepository<Entities.COURSE>();
            Entities.COURSE mod = repo.FindNoTracking(x => x.ID == courseToUpdate.ID).First();

            if (mod != null)
            {
                try
                {
                    repo.Update(courseToUpdate);
                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //Inserire LOG
                    resultOperation = false ;
                }
            }

            return resultOperation;
        }

        public static bool InsertCourse(Entities.COURSE courseToInsert)
        {
            bool resultOperation = false;
            EFRepository<Entities.COURSE> repo = new EFRepository<Entities.COURSE>();
            Entities.COURSE exists = repo.FindNoTracking(x => x.ID == courseToInsert.ID).First();

            if (exists == null)
            {
                try
                {
                    repo.Add(courseToInsert);
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

        public static bool RemoveCourse(int id)
        {
            bool resultOperation = false;
            EFRepository<Entities.COURSE> repo = new EFRepository<Entities.COURSE>();
            Entities.COURSE exists = repo.FindNoTracking(x => x.ID == id).First();

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
