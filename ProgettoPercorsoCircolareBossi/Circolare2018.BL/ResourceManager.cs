using Circolare2018.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Circolare2018.BL
{
    public static class ResourceManager
    {
        public static List<Entities.RESOURCE> GetAllResources()
        {
            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            return repo.GetAll().ToList();
        }

        public static Entities.RESOURCE GetResource(int Id)
        {
            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            return repo.Find(x => x.ID == Id).First();
        }

        public static bool UpdateResource(Entities.RESOURCE resourceToUpdate)
        {
            bool resultOperation = false;

            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            Entities.RESOURCE mod = repo.FindNoTracking(x => x.ID == resourceToUpdate.ID).First();

            if (mod != null)
            {
                try
                {
                    repo.Update(resourceToUpdate);
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

        public static bool InsertResource(Entities.RESOURCE resourceToInsert)
        {
            bool resultOperation = false;

            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            Entities.RESOURCE exists = repo.FindNoTracking(x => x.ID == resourceToInsert.ID).First();

            if (exists == null)    //check if already exists
            {
                try
                {
                    repo.Add
                    (
                        new Entities.RESOURCE
                        {
                            Name = resourceToInsert.Name,
                            Surname = resourceToInsert.Surname,
                            IsAvaiable = resourceToInsert.IsAvaiable,
                            IsCP = resourceToInsert.IsCP,
                            //verificare
                            COURSE = resourceToInsert.COURSE,
                            SUBSCRIPTION = resourceToInsert.SUBSCRIPTION,
                            TEACHING = resourceToInsert.TEACHING
                            //-------------
                        }
                    );

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

        public static bool RemoveResource(int Id)
        {
            bool resultOperation = false;

            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            Entities.RESOURCE exists = repo.FindNoTracking(x => x.ID == Id).First();

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
                    //Inserire LOG
                    resultOperation = false;
                }
               
            }

            return resultOperation;
        }

    }
}
